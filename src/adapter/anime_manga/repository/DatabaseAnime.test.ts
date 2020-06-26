import DatabaseAnime from './DatabaseAnimeManga';
import Anime from '../../../domain/anime';

describe('Database Anime', () => {
  let databaseAnime: DatabaseAnime<Anime>;
  beforeEach(() => {
    databaseAnime = new DatabaseAnime<Anime>('animes');
  });

  describe('Already existis', () => {
    it('should return true when anime is found', async () => {
      const result = await databaseAnime.alreadyExists('Mob');
      expect(result).toBe(true);
    });
  });
});
