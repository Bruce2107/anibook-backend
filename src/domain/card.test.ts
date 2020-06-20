import { Card as ICard } from 'anibook';
import Card from './card';

describe('Card', () => {
  test('should create a card', () => {
    const object: ICard = {
      name: 'name',
      photo: 'photo',
      folder: 'folder',
    };
    const card = new Card(object);
    expect(card.folder).toBe('folder');
    expect(card.photo).toBe('photo');
    expect(card.name).toBe('name');
  });
});
