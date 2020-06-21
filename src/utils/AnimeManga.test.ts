import AnimeMangaUtils from './AnimeManga';
import { Anime } from 'anibook';
import InMemoryAnime from '../adapter/anime/repository/InMemoryAnime';
import { readFileSync, unlinkSync } from 'fs';
import { Readable } from 'stream';

describe('Anime Utils', () => {
  let animeUtils: AnimeMangaUtils<Anime>;
  let animes: Anime[];
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
    animeUtils = new AnimeMangaUtils<Anime>(
      'animes',
      new InMemoryAnime(animes)
    );
  });

  describe('Delete', () => {
    test('should get 204 when object is removed', async () => {
      const result = await animeUtils._delete('anime2');

      expect(result).toBe(204);
    });
    test('should get 404 when object is not found', async () => {
      const result = await animeUtils._delete('anime');

      expect(result).toBe(404);
    });
  });

  describe('Create', () => {
    test('should get 201 when object is inserted without images', async () => {
      const anime: Anime = {
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
      const result = await animeUtils.create(
        '',
        anime,
        {} as { [fieldname: string]: Express.Multer.File[] }
      );

      expect(result).toBe(201);
    });

    test('should get 409 when object already exists without images', async () => {
      const anime: Anime = {
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
      const result = await animeUtils.create(
        '',
        anime,
        {} as { [fieldname: string]: Express.Multer.File[] }
      );

      expect(result).toBe(409);
    });

    describe('With images', () => {
      let image: Express.Multer.File;
      beforeAll(() => {
        image = {
          buffer: Buffer.from(
            readFileSync('src/utils/image_test/oono.jpg').toString('base64'),
            'base64'
          ),
          destination: '',
          encoding: '',
          fieldname: '',
          filename: 'oono.jpg',
          mimetype: 'image/jpg',
          originalname: 'oono.jpg',
          path: 'src/utils/image_test/oono.jpg',
          size: 122,
          stream: new Readable(),
        };
      });
      afterAll(() => {
        unlinkSync(`${image.path.split('.')[0]}.webp`);
      });
      test('should get 201 when object is inserted', async () => {
        const anime: Anime = {
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
        const result = await animeUtils.create('test', anime, {
          card: [image],
        } as { [fieldname: string]: Express.Multer.File[] });

        expect(result).toBe(201);
      });
      test('should get 422 when folder are missing', async () => {
        const anime: Anime = {
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
        const result = await animeUtils.create('', anime, {
          card: [image],
        } as { [fieldname: string]: Express.Multer.File[] });

        expect(result).toBe(422);
      });
    });
  });

  describe('Get Card', () => {
    test('should get a card object', async () => {
      const result = await animeUtils.getCard('anime2');

      expect(result.status).toBe(200);
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data.name).toBe('anime2');
      }
    });
    test('should get 404 when object is not found', async () => {
      const result = await animeUtils.getCard('anime');

      expect(result.status).toBe(404);
    });
  });

  describe('Get One', () => {
    test('should get an object', async () => {
      const result = await animeUtils.getOne('anime2');

      expect(result.status).toBe(200);
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data.name).toBe('anime2');
      }
    });
    test('should get 404 when object is not found', async () => {
      const result = await animeUtils.getOne('anime');

      expect(result.status).toBe(404);
    });
  });

  describe('Get Random', () => {
    test('should get all objects from array', async () => {
      const result = await animeUtils.getRandom('');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(animes.length);
      }
    });

    test('should get 2 objects from array', async () => {
      const result = await animeUtils.getRandom('2');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(2);
      }
    });

    test('should get an empty array', async () => {
      const result = await animeUtils.getRandom('0');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(0);
      }
    });
  });

  describe('Get Random Cards', () => {
    test('should get all cards from array', async () => {
      const result = await animeUtils.getRandomCards('');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(animes.length);
      }
    });

    test('should get 2 cards from array', async () => {
      const result = await animeUtils.getRandomCards('2');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(2);
      }
    });

    test('should get an empty array of cards', async () => {
      const result = await animeUtils.getRandomCards('0');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(0);
      }
    });
  });

  describe('Get Sort', () => {
    test('should get a sorted array with all objects from array', async () => {
      const result = await animeUtils.getSort('', '');

      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(animes.length);
        expect(result.data[0].name).toBe('anime1');
      }
    });

    test('should get a sorted array with 2 objects from array', async () => {
      const result = await animeUtils.getSort('2', '');

      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(2);
        expect(result.data[0].name).toBe('anime1');
      }
    });
  });

  describe('Get Sort Card', () => {
    test('should get a sorted array of card with all objects from array', async () => {
      const result = await animeUtils.getSort('', '');

      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(animes.length);
        expect(result.data[0].name).toBe('anime1');
      }
    });

    test('should get a sorted array of card with 2 objects from array', async () => {
      const result = await animeUtils.getSort('2', '');

      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(2);
        expect(result.data[0].name).toBe('anime1');
      }
    });
  });

  describe('Update', () => {
    describe('Without Images', () => {
      test('should get 204 when is updated', async () => {
        const anime: Anime = {
          name: 'anime2',
          photo: 'edited.webp',
          synopsis: 'edited',
          comment: 'text',
          info: {
            author: 'author',
            numberEpisodes: 123,
            status: 'status',
          },
          whereWatch: [{ language: 'edited', name: 'name', url: 'url' }],
        };

        const result = await animeUtils.updateAnyFieldsThatAreNotAFile(
          'anime2',
          anime
        );

        expect(result).toBe(204);
      });

      test('should get 404 when name is not found', async () => {
        const anime: Anime = {
          name: 'anime2',
          photo: 'edited.webp',
          synopsis: 'edited',
          comment: 'text',
          info: {
            author: 'author',
            numberEpisodes: 123,
            status: 'status',
          },
          whereWatch: [{ language: 'edited', name: 'name', url: 'url' }],
        };

        const result = await animeUtils.updateAnyFieldsThatAreNotAFile(
          'anime',
          anime
        );

        expect(result).toBe(404);
      });

      test('should get 409 when new name already exists', async () => {
        const anime: Anime = {
          name: 'anime1',
          photo: 'edited.webp',
          synopsis: 'edited',
          comment: 'text',
          info: {
            author: 'author',
            numberEpisodes: 123,
            status: 'status',
          },
          whereWatch: [{ language: 'edited', name: 'name', url: 'url' }],
        };

        const result = await animeUtils.updateAnyFieldsThatAreNotAFile(
          'anime2',
          anime
        );

        expect(result).toBe(409);
      });
    });

    describe('With Images', () => {
      let image: Express.Multer.File;
      beforeAll(() => {
        image = {
          buffer: Buffer.from(
            readFileSync('src/utils/image_test/oono.jpg').toString('base64'),
            'base64'
          ),
          destination: '',
          encoding: '',
          fieldname: '',
          filename: 'oono.jpg',
          mimetype: 'image/jpg',
          originalname: 'oono.jpg',
          path: 'src/utils/image_test/oono.jpg',
          size: 122,
          stream: new Readable(),
        };
      });
      afterAll(() => {
        unlinkSync(`${image.path.split('.')[0]}.webp`);
      });
      test('should get 204 when image photo is updated', async () => {
        const result = await animeUtils.updateImageFields('anime2', 'test', {
          card: [image],
        } as { [fieldname: string]: Express.Multer.File[] });

        expect(result).toBe(204);
      });

      test('should get 404 when name is not found', async () => {
        const result = await animeUtils.updateImageFields('anime', 'test', {
          card: [image],
        } as { [fieldname: string]: Express.Multer.File[] });

        expect(result).toBe(404);
      });

      test('should get 422 when are missing folder', async () => {
        const result = await animeUtils.updateImageFields('anime2', '', {
          card: [image],
        } as { [fieldname: string]: Express.Multer.File[] });

        expect(result).toBe(422);
      });
    });
  });
});
