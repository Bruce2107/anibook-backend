import Anime from './anime';
import { Anime as IAnime } from 'anibook';

describe('Anime', () => {
  test('should create an incomplete anime', () => {
    const object: IAnime = {
      name: 'anime',
      photo: 'photo.webp',
      synopsis: 'text',
      comment: 'text',
      info: {
        author: 'author',
        numberEpisodes: 123,
        status: 'status',
      },
      whereWatch: [{language: 'sda',name: 'name',url: 'url'}]
    };
    const a = new Anime(object);
    expect(a.name).toBe('anime');
    expect(a.folder).toBeUndefined();
    expect(a.photo).toBe('photo.webp');
  });

  test('should create a complete anime', () => {
    const object: IAnime = {
      comment: 'comment',
      folder: 'folder',
      images: ['images'],
      info: {
        author: 'author',
        numberEpisodes: 123,
        status: 'status',
      },
      musics: [{ language: 'language', name: 'name', url: 'https://url.com' }],
      name: 'name',
      photo: 'photo',
      synopsis: 'synopsis',
      whereWatch: [
        { language: 'language', name: 'name', url: 'https://url.com' },
      ],
    };
    const a = new Anime(object);
    expect(a.name).toBe('name');
    expect(a.images).toContain('images');
    expect(a.whereWatch).toBeDefined();
    expect(a.info.numberEpisodes).toBe(123);
  });
});
