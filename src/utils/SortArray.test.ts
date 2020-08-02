import { Data } from 'anibook';
import { SortArray } from './SortArray';

describe('Sort array', () => {
  const data: Data[] = [
    { name: 'one', comment: '', photo: '', synopsis: '' },
    { name: 'two', comment: '', photo: '', synopsis: '' },
    { name: 'tree', comment: '', photo: '', synopsis: '' },
    { name: 'four', comment: '', photo: '', synopsis: '' },
  ];

  it('should sort the array by name', () => {
    const result = data.sort(SortArray);

    expect(result[0].name).toBe('four');
    expect(result[result.length - 1].name).toBe('two');
  });
});
