import { GetResponse } from 'anibook';
import Anime from '../../domain/anime';

export default interface AnimeUtilsRepository {
  create(
    folder: string,
    dados: Anime,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<number>;
  _delete(name: string): Promise<number>;
  getCard(name: string): Promise<GetResponse<Anime>>;
  getAnime(name: string): Promise<GetResponse<Anime>>;
  getRandomAnimes(limit: number): Promise<GetResponse<Array<Anime>>>;
  getRandomCards(limit: number): Promise<GetResponse<Array<Anime>>>;
  updateAnyFieldsThatAreNotAFile(name: string, data: Anime): Promise<number>;
  updateImageFields(
    name: string,
    folder: string,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<number>;
}
