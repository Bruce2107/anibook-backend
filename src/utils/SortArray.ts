import { Data } from 'anibook';

export function SortArray<T extends Data>(a: T, b: T) {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();

  return nameA > nameB ? 1 : -1;
}
