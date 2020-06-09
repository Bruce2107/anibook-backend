import { Card as ICard } from 'anibook';
import Card from './card';

describe('Card', () => {
  test('should create a card', () => {
    const object: ICard = {
      name: 'name',
      photo: 'photo',
      folder: 'folder',
    };
    const c = new Card(object);
    expect(c.folder).toBe('folder');
    expect(c.photo).toBe('photo');
    expect(c.name).toBe('name');
  });
});
