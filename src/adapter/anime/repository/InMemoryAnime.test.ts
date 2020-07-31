import { isAnime } from 'anibook';
import InMemoryAnime from './InMemoryAnime';
import Anime from '../../../domain/anime';

describe('InMemoryAnime', () => {
  let animes: Anime[] = [];
  let inMemoryAnime: InMemoryAnime;
  beforeEach(() => {
    animes = [];
    animes.push(
      {
        name: 'anime2',
        photo: 'photo.webp',
        synopsis: 'text',
        comment: 'text',
        info: {
          author: 'author',
          numberEpisodes: 123,
          status: 'status',
        },
        whereWatch: [{ language: 'sda', name: 'name', url: 'url' }],
      },
      {
        name: 'anime1',
        photo: 'photo.webp',
        synopsis: 'text',
        comment: 'text',
        info: {
          author: 'author',
          numberEpisodes: 123,
          status: 'status',
        },
        whereWatch: [{ language: 'sda', name: 'name', url: 'url' }],
      },
      {
        name: 'anime3',
        photo: 'photo.webp',
        synopsis: 'text',
        comment: 'text',
        info: {
          author: 'author',
          numberEpisodes: 123,
          status: 'status',
        },
        whereWatch: [{ language: 'sda', name: 'name', url: 'url' }],
      }
    );
    inMemoryAnime = new InMemoryAnime(animes);
  });
  test('should delete an anime', async () => {
    const result = await inMemoryAnime._delete('anime2');
    expect(result).toBeTruthy();
  });
  test('should not delete an anime', async () => {
    const result = await inMemoryAnime._delete('anime0');
    expect(result).toBeFalsy();
  });
  test('should find an anime', async () => {
    const result = await inMemoryAnime.alreadyExists('anime2');
    expect(result).toBeTruthy();
  });
  test('should not find an anime', async () => {
    const result = await inMemoryAnime.alreadyExists('anime');
    expect(result).toBeFalsy();
  });
  test('should get an anime', async () => {
    const result = await inMemoryAnime.getOne('anime1', []);
    expect(isAnime(result)).toBeTruthy();
  });
  test('should not get an anime', async () => {
    const result = await inMemoryAnime.getOne('anime', []);
    expect(result).toBeFalsy();
  });
  test('should return 2 animes', async () => {
    const result = await inMemoryAnime.getRandom('2', []);
    expect(result.length).toBe(2);
  });
  test('should return a empty array when limit is 0', async () => {
    const result = await inMemoryAnime.getRandom('0', []);
    expect(result.length).toBe(0);
  });
  test('should insert a new anime', async () => {
    const newAnime: Anime = {
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
    const result = await inMemoryAnime.insert([], newAnime);
    expect(result).toBeTruthy();
  });
  test('should not insert a new anime', async () => {
    const newAnime: Anime = {
      name: 'anime2',
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
    const result = await inMemoryAnime.insert([], newAnime);
    expect(result).toBeFalsy();
  });

  test('should update an anime', async () => {
    const newAnime: Anime = {
      name: 'anime2',
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
    const result = await inMemoryAnime.update('anime2', newAnime);
    expect(result).toBeTruthy();
  });
  test('should not update an anime when not find', async () => {
    const newAnime: Anime = {
      name: 'anime2w',
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
    const result = await inMemoryAnime.update('anime2w', newAnime);
    expect(result).toBeFalsy();
  });
  test('should not update an anime have different names', async () => {
    const newAnime: Anime = {
      name: 'anime2',
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
    const result = await inMemoryAnime.update('anime2w', newAnime);
    expect(result).toBeFalsy();
  });
  test('should return a sorted array', async () => {
    const result = await inMemoryAnime.getAllSorted('', '', ['']);

    expect(result[0].name).toBe('anime1');
  });
  test('should return a slice sorted array', async () => {
    const result = await inMemoryAnime.getAllSorted('2', '', ['']);

    expect(result[0].name).toBe('anime1');
    expect(result.length).toBe(2);
  });
});
