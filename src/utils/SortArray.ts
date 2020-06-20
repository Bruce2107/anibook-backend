import { Data } from 'anibook';

export default function SortArray<T extends Data>(a: T, b: T) {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}
