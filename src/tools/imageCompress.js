// Logic for the image compressor. The pure helpers are unit tested; `compressImage` uses the
// browser's own decoder and canvas, so it runs only in the browser and is covered by the e2e test.
// Nothing here sends a file anywhere.

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_FILES = 10;
export const MAX_FILE_BYTES = 30 * 1024 * 1024;

export const OUTPUT_TYPES = [
  { id: 'webp', mime: 'image/webp', ext: 'webp' },
  { id: 'jpeg', mime: 'image/jpeg', ext: 'jpg' },
];

// 0 keeps the original size.
export const MAX_WIDTHS = [0, 3840, 2560, 1920, 1280, 800];

/** 'type' when the file is not a JPEG, PNG or WebP image, 'size' when it is too large, else null. */
export function validateFile(file) {
  if (!ACCEPTED_TYPES.includes(file.type)) return 'type';
  if (file.size > MAX_FILE_BYTES) return 'size';
  return null;
}

/** The size to draw at: never larger than the original, and `maxWidth` of 0 keeps it as it is. */
export function fitWithin(width, height, maxWidth) {
  if (!maxWidth || width <= maxWidth) return { width, height };
  return { width: maxWidth, height: Math.max(1, Math.round((height * maxWidth) / width)) };
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(bytes < 10 * 1024 * 1024 ? 2 : 1)} MB`;
}

/** Whole percent saved, 0 when the new file is not smaller. */
export function savedPercent(before, after) {
  if (!(before > 0) || after >= before) return 0;
  return Math.round(((before - after) / before) * 100);
}

/** "photo.png" and WebP become "photo-compressed.webp"; odd characters are kept, the extension is replaced. */
export function outputName(name, ext) {
  const base = name.replace(/\.[^./\\]+$/, '') || 'image';
  return `${base}-compressed.${ext}`;
}

/**
 * Re-encodes `file` as `mime` at `quality` (0 to 1), scaled down to `maxWidth` when that is set.
 * Resolves to { blob, width, height, originalWidth, originalHeight }. Rejects with an Error whose
 * message is 'decode' (the browser could not read the image) or 'encode' (it cannot write that format).
 */
export async function compressImage(file, { mime, quality, maxWidth }) {
  let bitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    throw new Error('decode');
  }
  const originalWidth = bitmap.width;
  const originalHeight = bitmap.height;
  const { width, height } = fitWithin(originalWidth, originalHeight, maxWidth);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (mime === 'image/jpeg') {
    // JPEG has no transparency; draw on white so transparent areas do not turn black.
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
  }
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, mime, quality));
  // A browser that cannot write the format quietly returns a PNG instead.
  if (!blob || blob.type !== mime) throw new Error('encode');
  return { blob, width, height, originalWidth, originalHeight };
}
