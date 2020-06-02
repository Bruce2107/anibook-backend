import { Link } from 'anibook';
import searchObjectInArray from './SearchObjectInArray';

describe('Search In Array', () => {
  const array: Link[] = [];
  beforeEach(() => {
    array.push({ language: 'pt', name: 'um', url: 'url1' });
    array.push({ language: 'pt', name: 'dois', url: 'url2' });
    array.push({ language: 'pt', name: 'tres', url: 'url3' });
    array.push({ language: 'pt', name: 'quatro', url: 'url4' });
  });
  it('should return false', () => {
    const result = searchObjectInArray('url', array);
    expect(result).toBeFalsy();
  });
  it('should return true', () => {
    const result = searchObjectInArray('url3', array);
    expect(result).toBeTruthy();
  });
});
