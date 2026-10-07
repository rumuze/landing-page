import { describe, expect, it } from 'vitest';
import { MAX_FILE_BYTES, fitWithin, formatBytes, outputName, savedPercent, validateFile } from './imageCompress';

describe('validateFile', () => {
  it('accepts JPEG, PNG and WebP within the size limit', () => {
    expect(validateFile({ type: 'image/png', size: 1000 })).toBeNull();
    expect(validateFile({ type: 'image/webp', size: MAX_FILE_BYTES })).toBeNull();
  });
  it('refuses other types and files that are too large', () => {
    expect(validateFile({ type: 'image/gif', size: 10 })).toBe('type');
    expect(validateFile({ type: 'application/pdf', size: 10 })).toBe('type');
    expect(validateFile({ type: 'image/jpeg', size: MAX_FILE_BYTES + 1 })).toBe('size');
  });
});

describe('fitWithin', () => {
  it('keeps the size when no limit is set or the image is already small enough', () => {
    expect(fitWithin(4000, 3000, 0)).toEqual({ width: 4000, height: 3000 });
    expect(fitWithin(800, 600, 1920)).toEqual({ width: 800, height: 600 });
  });
  it('scales down keeping the proportions', () => {
    expect(fitWithin(4000, 3000, 1000)).toEqual({ width: 1000, height: 750 });
    expect(fitWithin(3000, 1, 100)).toEqual({ width: 100, height: 1 });
  });
});

describe('formatBytes and savedPercent', () => {
  it('writes sizes readably', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(2048)).toBe('2.0 KB');
    expect(formatBytes(150 * 1024)).toBe('150 KB');
    expect(formatBytes(2.5 * 1024 * 1024)).toBe('2.50 MB');
    expect(formatBytes(25 * 1024 * 1024)).toBe('25.0 MB');
  });
  it('gives whole percent saved and never a negative', () => {
    expect(savedPercent(1000, 250)).toBe(75);
    expect(savedPercent(1000, 1000)).toBe(0);
    expect(savedPercent(1000, 1200)).toBe(0);
    expect(savedPercent(0, 0)).toBe(0);
  });
});

describe('outputName', () => {
  it('replaces the extension', () => {
    expect(outputName('photo.png', 'webp')).toBe('photo-compressed.webp');
    expect(outputName('my.holiday.photo.JPG', 'jpg')).toBe('my.holiday.photo-compressed.jpg');
    expect(outputName('no-extension', 'webp')).toBe('no-extension-compressed.webp');
    expect(outputName('.png', 'webp')).toBe('image-compressed.webp');
  });
});
