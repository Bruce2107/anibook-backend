import { Manga as IManga } from 'anibook';
import { Manga } from './manga';

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
      whereRead: [{ language: 'asd', name: 'sad', url: 'sad' }],
    };
    const manga = new Manga(object);
    expect(manga.name).toBe('anime');
    expect(manga.folder).toBeUndefined();
    expect(manga.photo).toBe('photo.webp');
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
    const manga = new Manga(object);
    expect(manga.name).toBe('name');
    expect(manga.images).toContain('images');
    expect(manga.whereRead).toBeDefined();
    expect(manga.info.numberChapters).toBe(12);
  });
});
