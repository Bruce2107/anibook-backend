import Manga from './manga';
import { Manga as IManga } from 'anibook';

describe('Anime', () => {
  test('should create an incomplete manga', () => {
    const object: IManga = {
      name: 'anime',
      photo: 'photo.webp',
      synopsis: 'text',
      comment: 'text',
      info: {
        author: 'author',
        status: 'status',
        numberChapters: 12,
        numberVolumes: 1,
      },
    };
    const a = new Manga(object);
    expect(a.name).toBe('anime');
    expect(a.folder).toBeUndefined();
    expect(a.photo).toBe('photo.webp');
  });

  test('should create a complete manga', () => {
    const object: IManga = {
      comment: 'comment',
      folder: 'folder',
      images: ['images'],
      info: {
        author: 'author',
        status: 'status',
        numberChapters: 12,
        numberVolumes: 1,
      },
      name: 'name',
      photo: 'photo',
      synopsis: 'synopsis',
      whereRead: [
        { language: 'language', name: 'name', url: 'https://url.com' },
      ],
    };
    const a = new Manga(object);
    expect(a.name).toBe('name');
    expect(a.images).toContain('images');
    expect(a.whereRead).toBeDefined();
    expect(a.info.numberChapters).toBe(12);
  });
});
