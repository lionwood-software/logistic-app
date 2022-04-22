export interface SourceType {
  name: string;
  value: string;
}

export const enumDisplayRender = (
  array: string[],
  source: SourceType[],
  separator = ", "
): string => {
  const renderedValues: Array<string> = [];

  source.filter((element: SourceType) => {
    if (array.includes(element.value)) {
      renderedValues.push(element.name);
    }
  });
  return renderedValues.join(separator);
};
