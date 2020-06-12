import { GetResponse } from 'anibook';

export default interface AnimeMangaUtilsRepository<T> {
  create(
    folder: string,
    dados: T,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<number>;
  _delete(name: string): Promise<number>;
  getCard(name: string): Promise<GetResponse<T>>;
  getOne(name: string): Promise<GetResponse<T>>;
  getRandom(limit: string): Promise<GetResponse<Array<T>>>;
  getRandomCards(limit: string): Promise<GetResponse<Array<T>>>;
  updateAnyFieldsThatAreNotAFile(name: string, data: T): Promise<number>;
  updateImageFields(
    name: string,
    folder: string,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<number>;
}
