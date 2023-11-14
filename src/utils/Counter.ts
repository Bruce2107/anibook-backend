export function Counter<R extends string>(
  list: string[],
  counter: { [key in R]: number }
) {
  list.forEach((i) => counter[i as R]++);
  return counter;
}
