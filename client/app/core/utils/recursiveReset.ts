export const reset = (obj: any): void => {
  Object.keys(obj).map((key) => {
    if (obj[key] === Object(obj[key])) {
      reset(obj[key]);
      return;
    }
    if (obj[key] instanceof Array) obj[key] = [];
    else obj[key] = null;
  });
};
