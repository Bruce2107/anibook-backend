export function RemoveObjectProperties<R>(
  object: any[],
  expectedItems: string[]
): R[] {
  object.forEach((item) => {
    Object.keys(item)
      .filter((toFilter) => !expectedItems.includes(toFilter))
      .forEach((toRemove) => delete item[toRemove]);
  });
  return object;
}
