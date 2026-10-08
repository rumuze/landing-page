/** Saves a Blob as a file with the given name: a link is made, clicked and removed on the spot. */
export function saveBlob(name, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Saves text as a file. */
export const saveText = (name, text, type) => saveBlob(name, new Blob([text], { type }));
