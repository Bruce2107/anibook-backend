import DatabaseAnime from './DatabaseAnimeManga';
import Anime from '../../../domain/anime';
import { CardFields } from '../../../constants/Card';
describe('Database Anime', () => {
  let databaseAnime: DatabaseAnime<Anime>;
  beforeEach(() => {
    databaseAnime = new DatabaseAnime<Anime>('animes');
  });

  describe('Already exists', () => {
    it('should return true when anime is found', async () => {
      const result = await databaseAnime.alreadyExists('Mob');
      expect(result).toBe(true);
    });
    it('should return false when anime is not found', async () => {
      const result = await databaseAnime.alreadyExists('mob');
      expect(result).toBe(false);
    });
  });

  describe('Get All Sorted', () => {
    it('should get all animes sorted by name', async () => {
      const result = await databaseAnime.getAllSorted('0', 'name', CardFields);
      console.log(result);
    });
  });
});
