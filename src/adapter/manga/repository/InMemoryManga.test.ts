import { isManga } from 'anibook';
import InMemoryManga from './InMemoryManga';
import Manga from '../../../domain/manga';

describe('InMemoryManga', () => {
  let mangas: Manga[] = [];
  let inMemoryManga: InMemoryManga;
  beforeEach(() => {
    mangas = [];
    mangas.push(
      {
        name: 'manga1',
        photo: 'photo.webp',
        synopsis: 'text',
        comment: 'text',
        info: {
          author: 'author',
          status: 'status',
          numberChapters: 12,
          numberVolumes: 1,
        },
        whereRead: [{ language: 'sda', name: 'name', url: 'url' }],
      },
      {
        name: 'manga2',
        photo: 'photo.webp',
        synopsis: 'text',
        comment: 'text',
        info: {
          author: 'author',
          status: 'status',
          numberChapters: 12,
          numberVolumes: 1,
        },
        whereRead: [{ language: 'sda', name: 'name', url: 'url' }],
      },
      {
        name: 'manga3',
        photo: 'photo.webp',
        synopsis: 'text',
        comment: 'text',
        info: {
          author: 'author',
          status: 'status',
          numberChapters: 12,
          numberVolumes: 1,
        },
        whereRead: [{ language: 'sda', name: 'name', url: 'url' }],
      }
    );
    inMemoryManga = new InMemoryManga(mangas);
  });
  test('should delete an manga', async () => {
    const result = await inMemoryManga._delete('manga2');
    expect(result).toBeTruthy();
  });
  test('should not delete an manga', async () => {
    const result = await inMemoryManga._delete('manga0');
    expect(result).toBeFalsy();
  });
  test('should find an manga', async () => {
    const result = await inMemoryManga.alreadyExists('manga2');
    expect(result).toBeTruthy();
  });
  test('should not find an manga', async () => {
    const result = await inMemoryManga.alreadyExists('manga');
    expect(result).toBeFalsy();
  });
  test('should get an manga', async () => {
    const result = await inMemoryManga.getOne('manga1', []);
    expect(isManga(result)).toBeTruthy();
  });
  test('should not get an manga', async () => {
    const result = await inMemoryManga.getOne('manga', []);
    expect(result).toBeFalsy();
  });
  test('should return 2 mangas', async () => {
    const result = await inMemoryManga.getRandom('2', []);
    expect(result.length).toBe(2);
  });
  test('should return a empty array when limit is 0', async () => {
    const result = await inMemoryManga.getRandom('0', []);
    expect(result.length).toBe(0);
  });
  test('should insert a new manga', async () => {
    const newManga: Manga = {
      name: 'manga',
      photo: 'photo.webp',
      synopsis: 'text',
      comment: 'text',
      info: {
        author: 'author',
        status: 'status',
        numberChapters: 12,
        numberVolumes: 1,
      },
      whereRead: [{ language: 'sda', name: 'name', url: 'url' }],
    };
    const result = await inMemoryManga.insert([], newManga);
    expect(result).toBeTruthy();
  });
  test('should not insert a new manga', async () => {
    const newManga: Manga = {
      name: 'manga2',
      photo: 'photo.webp',
      synopsis: 'text',
      comment: 'text',
      info: {
        author: 'author',
        status: 'status',
        numberChapters: 12,
        numberVolumes: 1,
      },
      whereRead: [{ language: 'sda', name: 'name', url: 'url' }],
    };
    const result = await inMemoryManga.insert([], newManga);
    expect(result).toBeFalsy();
  });

  test('should update an manga', async () => {
    const newManga: Manga = {
      name: 'manga2',
      photo: 'photo.webp',
      synopsis: 'text',
      comment: 'text',
      info: {
        author: 'author',
        status: 'status',
        numberChapters: 12,
        numberVolumes: 1,
      },
      whereRead: [{ language: 'sda', name: 'name', url: 'url' }],
    };
    const result = await inMemoryManga.update('manga2', newManga);
    expect(result).toBeTruthy();
  });
  test('should not update an manga when not find', async () => {
    const newManga: Manga = {
      name: 'manga2w',
      photo: 'photo.webp',
      synopsis: 'text',
      comment: 'text',
      info: {
        author: 'author',
        status: 'status',
        numberChapters: 12,
        numberVolumes: 1,
      },
      whereRead: [{ language: 'sda', name: 'name', url: 'url' }],
    };
    const result = await inMemoryManga.update('manga2w', newManga);
    expect(result).toBeFalsy();
  });
  test('should not update an manga have different names', async () => {
    const newManga: Manga = {
      name: 'manga2',
      photo: 'photo.webp',
      synopsis: 'text',
      comment: 'text',
      info: {
        author: 'author',
        status: 'status',
        numberChapters: 12,
        numberVolumes: 1,
      },
      whereRead: [{ language: 'sda', name: 'name', url: 'url' }],
    };
    const result = await inMemoryManga.update('manga2w', newManga);
    expect(result).toBeFalsy();
  });
  test('should return a sorted array', async () => {
    const result = await inMemoryManga.getAllSorted('', '', ['']);

    expect(result[0].name).toBe('manga1');
  });
  test('should return a slice sorted array', async () => {
    const result = await inMemoryManga.getAllSorted('2', '', ['']);

    expect(result[0].name).toBe('manga1');
    expect(result.length).toBe(2);
  });
});
