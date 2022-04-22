export const determineFileType = (type: string): string | null => {
  switch (type) {
    case "application/pdf":
      return "/static/icons/mimetype/pdf.svg";
    case "image/png":
      return "/static/icons/mimetype/png.svg";
    case "image/svg+xml":
      return "/static/icons/mimetype/svg.svg";
    case "text/plain":
      return "/static/icons/mimetype/txt.svg";
    case "application/vnd.ms-excel":
      return "/static/icons/mimetype/xls.svg";
    default:
      return null;
  }
};
