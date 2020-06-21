import AnimeMangaUtils from './AnimeManga';
import { Anime, Manga, TypeImage } from 'anibook';
import InMemoryAnime from '../adapter/anime/repository/InMemoryAnime';
import InMemoryManga from '../adapter/manga/repository/InMemoryManga';
import InMemoryImage from '../adapter/image/repository/InMemoryImage';
import { readFileSync } from 'fs';
import { Readable } from 'stream';

describe('Anime Utils', () => {
  let animeUtils: AnimeMangaUtils<Anime>;
  let animes: Anime[];
  let images: TypeImage[];
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
        musics: [{ language: 'edited', name: 'name', url: 'music' }],
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

    images = [];
    images.push(
      {
        contentType: 'image/webpy',
        folder: 'background',
        image: Buffer.from(
          readFileSync(
            'src/adapter/image/repository/ToshinoKyokoTomato.webp'
          ).toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato.webp',
      },
      {
        contentType: 'image/webpi',
        folder: 'yuruyuri',
        image: Buffer.from(
          readFileSync(
            'src/adapter/image/repository/ToshinoKyokoTomato.webp'
          ).toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato.webp',
      },
      {
        contentType: 'image/webp',
        folder: 'yuruyuri2',
        image: Buffer.from(
          readFileSync(
            'src/adapter/image/repository/ToshinoKyokoTomato.webp'
          ).toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato.webp',
      }
    );
    animeUtils = new AnimeMangaUtils<Anime>(
      'animes',
      new InMemoryAnime(animes),
      new InMemoryImage(images)
    );
  });

  describe('Delete', () => {
    test('should get 204 when anime object is removed', async () => {
      const result = await animeUtils._delete('anime2');

      expect(result).toBe(204);
    });
    test('should get 404 when anime object is not found on delete', async () => {
      const result = await animeUtils._delete('anime');

      expect(result).toBe(404);
    });
  });

  describe('Create', () => {
    describe('Without Images', () => {
      test('should get 201 when anime object is inserted without images', async () => {
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

      test('should get 409 when anime object already exists without images', async () => {
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

      test('should get 201 when anime object is inserted with images', async () => {
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
      test('should get 422 when anime folder is missing on create', async () => {
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
    test('should get an anime card object', async () => {
      const result = await animeUtils.getCard('anime2');

      expect(result.status).toBe(200);
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data.name).toBe('anime2');
      }
    });
    test('should get 404 when anime card object is not found', async () => {
      const result = await animeUtils.getCard('anime');

      expect(result.status).toBe(404);
    });
  });

  describe('Get One', () => {
    test('should get an anime object', async () => {
      const result = await animeUtils.getOne('anime2');

      expect(result.status).toBe(200);
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data.name).toBe('anime2');
      }
    });
    test('should get 404 when anime object is not found on get one', async () => {
      const result = await animeUtils.getOne('anime');

      expect(result.status).toBe(404);
    });
  });

  describe('Get Random', () => {
    test('should get all anime objects from array', async () => {
      const result = await animeUtils.getRandom('');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(animes.length);
      }
    });

    test('should get 2 anime objects from array', async () => {
      const result = await animeUtils.getRandom('2');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(2);
      }
    });

    test('should get an empty anime array', async () => {
      const result = await animeUtils.getRandom('0');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(0);
      }
    });
  });

  describe('Get Random Cards', () => {
    test('should get all anime cards from array', async () => {
      const result = await animeUtils.getRandomCards('');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(animes.length);
      }
    });

    test('should get 2 anime cards from array', async () => {
      const result = await animeUtils.getRandomCards('2');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(2);
      }
    });

    test('should get an empty anime card array', async () => {
      const result = await animeUtils.getRandomCards('0');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(0);
      }
    });
  });

  describe('Get Sort', () => {
    test('should get a sorted array with all anime objects from array', async () => {
      const result = await animeUtils.getSort('', '');

      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(animes.length);
        expect(result.data[0].name).toBe('anime1');
      }
    });

    test('should get a sorted array with 2 anime objects from array', async () => {
      const result = await animeUtils.getSort('2', '');

      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(2);
        expect(result.data[0].name).toBe('anime1');
      }
    });
  });

  describe('Get Sort Card', () => {
    test('should get a sorted array of card with all anime objects from array', async () => {
      const result = await animeUtils.getSortCard('', '');

      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(animes.length);
        expect(result.data[0].name).toBe('anime1');
      }
    });

    test('should get a sorted array of card with 2 anime objects from array', async () => {
      const result = await animeUtils.getSortCard('2', '');

      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(2);
        expect(result.data[0].name).toBe('anime1');
      }
    });
  });

  describe('Update', () => {
    describe('Without Images', () => {
      test('should get 204 when is updated for anime', async () => {
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
          whereWatch: [{ language: 'edited', name: 'name', url: 'newWatch' }],
          musics: [{ language: 'edited', name: 'name', url: 'newMusic' }],
          folder: 'newFolder',
        };

        const result = await animeUtils.updateAnyFieldsThatAreNotAFile(
          'anime2',
          anime
        );

        expect(result).toBe(204);

        const newAnime = await animeUtils.getOne('anime2');
        if (newAnime.data) {
          expect(newAnime.data.whereWatch.length).toBe(2);
          if (newAnime.data.musics) {
            expect(newAnime.data.musics.length).toBe(2);
          }
        }
      });

      test('should get 404 when anime name is not found on update', async () => {
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

      test('should get 409 when new anime name already exists', async () => {
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

      test('should get 204 when anime image photo is updated', async () => {
        const result = await animeUtils.updateImageFields('anime2', 'test', {
          card: [image],
          images: [image, image],
        } as { [fieldname: string]: Express.Multer.File[] });

        expect(result).toBe(204);

        const anime = await animeUtils.getCard('anime2');

        if (anime.data) {
          expect(anime.data.folder).toBe('test');
        }
      });

      test('should get 404 when anime name is not found with image', async () => {
        const result = await animeUtils.updateImageFields('anime', 'test', {
          card: [image],
        } as { [fieldname: string]: Express.Multer.File[] });

        expect(result).toBe(404);
      });

      test('should get 422 when anime folder is missing on update', async () => {
        const result = await animeUtils.updateImageFields('anime2', '', {
          card: [image],
        } as { [fieldname: string]: Express.Multer.File[] });

        expect(result).toBe(422);
      });
    });
  });
});

describe('Manga Utils', () => {
  let mangaUtils: AnimeMangaUtils<Manga>;
  let mangas: Manga[];
  let images: TypeImage[];
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
    images = [];
    images.push(
      {
        contentType: 'image/webpy',
        folder: 'background',
        image: Buffer.from(
          readFileSync(
            'src/adapter/image/repository/ToshinoKyokoTomato.webp'
          ).toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato.webp',
      },
      {
        contentType: 'image/webpi',
        folder: 'yuruyuri',
        image: Buffer.from(
          readFileSync(
            'src/adapter/image/repository/ToshinoKyokoTomato.webp'
          ).toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato.webp',
      },
      {
        contentType: 'image/webp',
        folder: 'yuruyuri2',
        image: Buffer.from(
          readFileSync(
            'src/adapter/image/repository/ToshinoKyokoTomato.webp'
          ).toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato.webp',
      }
    );
    mangaUtils = new AnimeMangaUtils<Manga>(
      'mangas',
      new InMemoryManga(mangas),
      new InMemoryImage(images)
    );
  });

  describe('Delete Manga', () => {
    test('should get 204 when manga object is removed', async () => {
      const result = await mangaUtils._delete('manga2');

      expect(result).toBe(204);
    });
    test('should get 404 when manga object is not found on delete', async () => {
      const result = await mangaUtils._delete('manga');

      expect(result).toBe(404);
    });
  });

  describe('Create Manga', () => {
    describe('Without images', () => {
      test('should get 201 when manga object is inserted without images', async () => {
        const manga: Manga = {
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
        const result = await mangaUtils.create(
          '',
          manga,
          {} as { [fieldname: string]: Express.Multer.File[] }
        );

        expect(result).toBe(201);
      });

      test('should get 409 when manga object already exists without images', async () => {
        const manga: Manga = {
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
        };
        const result = await mangaUtils.create(
          '',
          manga,
          {} as { [fieldname: string]: Express.Multer.File[] }
        );

        expect(result).toBe(409);
      });
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

      test('should get 201 when manga object is inserted', async () => {
        const manga: Manga = {
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
        const result = await mangaUtils.create('test', manga, {
          card: [image],
        } as { [fieldname: string]: Express.Multer.File[] });

        expect(result).toBe(201);
      });
      test('should get 422 when manga folder is missing on create', async () => {
        const manga: Manga = {
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
        const result = await mangaUtils.create('', manga, {
          card: [image],
        } as { [fieldname: string]: Express.Multer.File[] });

        expect(result).toBe(422);
      });
    });
  });

  describe('Get Card Manga', () => {
    test('should get a manga card object', async () => {
      const result = await mangaUtils.getCard('manga2');

      expect(result.status).toBe(200);
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data.name).toBe('manga2');
      }
    });
    test('should get 404 when manga object is not found get card', async () => {
      const result = await mangaUtils.getCard('manga');

      expect(result.status).toBe(404);
    });
  });

  describe('Get One Manga', () => {
    test('should get an manga object', async () => {
      const result = await mangaUtils.getOne('manga2');

      expect(result.status).toBe(200);
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data.name).toBe('manga2');
      }
    });
    test('should get 404 when manga object is not found get one', async () => {
      const result = await mangaUtils.getOne('manga');

      expect(result.status).toBe(404);
    });
  });

  describe('Get Random Manga', () => {
    test('should get all manga objects from array', async () => {
      const result = await mangaUtils.getRandom('');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(mangas.length);
      }
    });

    test('should get 2 manga objects from array', async () => {
      const result = await mangaUtils.getRandom('2');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(2);
      }
    });

    test('should get an empty manga array', async () => {
      const result = await mangaUtils.getRandom('0');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(0);
      }
    });
  });

  describe('Get Random Cards Manga', () => {
    test('should get all manga cards from array', async () => {
      const result = await mangaUtils.getRandomCards('');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(mangas.length);
      }
    });

    test('should get 2 manga cards from array', async () => {
      const result = await mangaUtils.getRandomCards('2');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(2);
      }
    });

    test('should get an empty manga array of cards', async () => {
      const result = await mangaUtils.getRandomCards('0');
      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(0);
      }
    });
  });

  describe('Get Sort Manga', () => {
    test('should get a sorted array with all manga objects from array', async () => {
      const result = await mangaUtils.getSort('', '');

      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(mangas.length);
        expect(result.data[0].name).toBe('manga1');
      }
    });

    test('should get a sorted array with 2 manga objects from array', async () => {
      const result = await mangaUtils.getSort('2', '');

      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(2);
        expect(result.data[0].name).toBe('manga1');
      }
    });
  });

  describe('Get Sort Card Manga', () => {
    test('should get a sorted array of card with all manga objects from array', async () => {
      const result = await mangaUtils.getSortCard('', '');

      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(mangas.length);
        expect(result.data[0].name).toBe('manga1');
      }
    });

    test('should get a sorted array of card with 2 manga objects from array', async () => {
      const result = await mangaUtils.getSortCard('2', '');

      expect(result.status).toBe(200);
      if (result.data) {
        expect(result.data.length).toBe(2);
        expect(result.data[0].name).toBe('manga1');
      }
    });
  });

  describe('Update Manga', () => {
    describe('Without Images (manga)', () => {
      test('should get 204 when is updated for manga', async () => {
        const manga: Manga = {
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
          whereRead: [{ language: 'newRead', name: 'name', url: 'newRead' }],
          folder: 'newfolder',
        };

        const result = await mangaUtils.updateAnyFieldsThatAreNotAFile(
          'manga2',
          manga
        );

        expect(result).toBe(204);
      });

      test('should get 404 when manga name is not found without image', async () => {
        const manga: Manga = {
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

        const result = await mangaUtils.updateAnyFieldsThatAreNotAFile(
          'manga',
          manga
        );

        expect(result).toBe(404);
      });

      test('should get 409 when new manga name already exists', async () => {
        const manga: Manga = {
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
        };

        const result = await mangaUtils.updateAnyFieldsThatAreNotAFile(
          'manga2',
          manga
        );

        expect(result).toBe(409);
      });
    });

    describe('With Images (manga)', () => {
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

      test('should get 204 when manga photo is updated', async () => {
        const result = await mangaUtils.updateImageFields('manga2', 'test', {
          card: [image],
        } as { [fieldname: string]: Express.Multer.File[] });

        expect(result).toBe(204);
      });

      test('should get 404 when manga name is not found with image', async () => {
        const result = await mangaUtils.updateImageFields('manga', 'test', {
          card: [image],
        } as { [fieldname: string]: Express.Multer.File[] });

        expect(result).toBe(404);
      });

      test('should get 422 when manga folder is missing on update', async () => {
        const result = await mangaUtils.updateImageFields('manga2', '', {
          card: [image],
        } as { [fieldname: string]: Express.Multer.File[] });

        expect(result).toBe(422);
      });
    });
  });
});
