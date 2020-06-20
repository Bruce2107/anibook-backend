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
      whereWatch: [{ language: 'sda', name: 'name', url: 'url' }],
    };
    const anime = new Anime(object);
    expect(anime.name).toBe('anime');
    expect(anime.folder).toBeUndefined();
    expect(anime.photo).toBe('photo.webp');
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
    const anime = new Anime(object);
    expect(anime.name).toBe('name');
    expect(anime.images).toContain('images');
    expect(anime.whereWatch).toBeDefined();
    expect(anime.info.numberEpisodes).toBe(123);
  });
});
