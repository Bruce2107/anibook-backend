import { DatabaseAnimeMangaRepository } from './DatabaseAnimeManga';
import { Anime } from '../../../domain/anime';
import { CardFields } from '../../../constants/Card';

describe('Database Anime', () => {
  let databaseAnime: DatabaseAnimeMangaRepository<Anime>;
  beforeEach(() => {
    databaseAnime = new DatabaseAnimeMangaRepository<Anime>('animes');
  });

  describe('Already exists', () => {
    it('should return true when anime is found', async () => {
      const result = await databaseAnime.alreadyExists('Asobi Asobase');
      expect(result).toBe(true);
    });
    it('should return false when anime is not found', async () => {
      const result = await databaseAnime.alreadyExists('mob');
      expect(result).toBe(false);
    });
  });

  describe('Get All Sorted', () => {
    it('should get all animes sorted by name', async () => {
      const result = await databaseAnime.getAllSorted('11', 'name', CardFields);
      expect(result[0].name).toBe('Asobi Asobase');
    });
  });

  describe('Get One', () => {
    it('Should return one card', async () => {
      const result = await databaseAnime.getOne('Asobi Asobase', CardFields);
      if (result) {
        expect(result.name).toBe('Asobi Asobase');
      }
    });
    it('Should not get an card', async () => {
      const result = await databaseAnime.getOne('Not Found', CardFields);
      expect(result).toBeNull();
    });
  });

  describe('Get Random', () => {
    it('should get an card', async () => {
      const result = await databaseAnime.getRandom('1', CardFields);
      expect(result[0]).toBeDefined();
    });
  });

  describe('Insert', () => {
    it('should insert an anime', async () => {
      const anime: Anime = {
        name: 'Mob',
        photo: 'photo.webp',
        synopsis: 'um garoto que com poderes que quer ser normal',
        comment: 'mt bom',
        whereWatch: [
          {
            language: 'portugues',
            name: 'crunchyroll',
            url: 'https://www.crunchyroll.com/pt-br',
          },
        ],
        info: { author: 'one', status: 'finalizado', numberEpisodes: 12 },
        musics: [
          {
            language: 'japones',
            url: 'https://music.youtube.com/watch?v=aFPGhSkx7eA',
            name: 'Mob Choir 99',
          },
        ],
      };

      const result = await databaseAnime.insert(['dados'], anime);

      expect(result).toBe(true);
    });
  });

  describe('Update', () => {
    it('should update an anime', async () => {
      const anime: Anime = {
        name: 'Mob',
        photo: 'photo.webp',
        synopsis: 'novo teste',
        comment: 'mt bom',
        whereWatch: [
          {
            language: 'portugues',
            name: 'crunchyroll',
            url: 'https://www.crunchyroll.com/pt-br',
          },
        ],
        info: { author: 'one', status: 'finalizado', numberEpisodes: 12 },
        musics: [
          {
            language: 'japones',
            url: 'https://music.youtube.com/watch?v=aFPGhSkx7eA',
            name: 'Mob Choir 99',
          },
        ],
      };
      const result = await databaseAnime.update('Mob', anime);
      expect(result).toBe(true);
    });

    it('should not update an anime', async () => {
      const anime: Anime = {
        name: 'Mob',
        photo: 'photo.webp',
        synopsis: 'novo teste',
        comment: 'mt bom',
        whereWatch: [
          {
            language: 'portugues',
            name: 'crunchyroll',
            url: 'https://www.crunchyroll.com/pt-br',
          },
        ],
        info: { author: 'one', status: 'finalizado', numberEpisodes: 12 },
        musics: [
          {
            language: 'japones',
            url: 'https://music.youtube.com/watch?v=aFPGhSkx7eA',
            name: 'Mob Choir 99',
          },
        ],
      };
      const result = await databaseAnime.update('Mob2', anime);
      expect(result).toBe(false);
    });
  });

  describe('Delete', () => {
    it('should delete an anime', async () => {
      const result = await databaseAnime._delete('Mob');
      expect(result).toBe(true);
    });
    it('should not delete an anime', async () => {
      const result = await databaseAnime._delete('Mob');
      expect(result).toBe(false);
    });
  });
});
