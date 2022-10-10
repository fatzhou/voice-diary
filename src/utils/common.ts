export const DebugLevel = __DEV__ ? 2 : 1;

// 通过Object.prototype.toString获取变量的类型
const getType = (data: any) => {
  const type = Object.prototype.toString
    .call(data)
    .toLowerCase()
    .replace(/^\[object\s+([a-z]+)\]$/g, '$1');
  return type;
};

// equal console.log
export const log = (...obj: any) => {
  const data: string = obj.reduce((total: string, next: any) => {
    if (next === undefined) {
      return total;
    }
    const type = getType(next);
    const message = type === 'object' ? JSON.stringify(next) : '' + next;
    return total + ' | ' + message;
  });
  if (DebugLevel === 2) {
    console.log(data);
  }
};

// base 64 to blob
export function imageBase64ToBlob(base64Image: string) {
  const parts = base64Image.split(';base64,');
  const imageType = parts[0].split(':')[1];
  const decodedData = window.atob(parts[1]);
  const uInt8Array = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }
  // Return BLOB image after conversion
  return new Blob([uInt8Array], {type: imageType});
}

export function blobToBlobUrl(blob: Blob) {
  return URL.createObjectURL(blob);
}
