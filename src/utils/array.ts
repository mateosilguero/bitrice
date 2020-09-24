export const uniqueElementsBy = <T extends unknown>(
  arr: T[],
  fn: (v: T, x: T) => boolean,
): T[] =>
  arr.reduce((acc, v) => {
    if (!acc.some((x) => fn(v, x))) {
      acc.push(v);
    }
    return acc;
  }, [] as T[]);
