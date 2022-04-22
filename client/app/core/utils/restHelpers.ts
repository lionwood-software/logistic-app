export const downloadFile = (blob: Blob, name: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("download", name);
  link.href = url;
  link.target = "_blank";
  link.click();
  window.URL.revokeObjectURL(url);
};
