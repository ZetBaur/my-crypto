export const getUniqueElements = (array: any[], prop: string | number): any => {
  const elements = [
    ...new Map(
      array.filter(Boolean).map((item) => [item[prop], item])
    ).values(),
  ];

  return elements;
};
