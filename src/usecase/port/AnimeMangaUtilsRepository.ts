import { GetResponse } from 'anibook';

export interface AnimeMangaUtilsRepository<T> {
  /**
   *
   * @param string folder
   * @param T data
   * @param Object files
   */
  create(
    folder: string,
    data: T,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<number>;
  /**
   *
   * @param string name
   */
  _delete(name: string): Promise<number>;
  /**
   *
   * @param string name
   */
  getCard(name: string): Promise<GetResponse<T>>;
  /**
   *
   * @param string name
   */
  getOne(name: string): Promise<GetResponse<T>>;
  /**
   *
   * @param string limit a number as string
   */
  getRandom(limit: string): Promise<GetResponse<Array<T>>>;
  /**
   *
   * @param string limit a number as string
   */
  getRandomCards(limit: string): Promise<GetResponse<Array<T>>>;
  /**
   *
   * @param string limit a number as string
   * @param string field to sort
   */
  getSort(limit: string, sortField: string): Promise<GetResponse<Array<T>>>;
  /**
   *
   * @param string limit a number as string
   * @param string field to sort
   */
  getSortCard(limit: string, sortField: string): Promise<GetResponse<Array<T>>>;
  /**
   *
   * @param string name
   * @param T data
   */
  updateAnyFieldsThatAreNotAFile(name: string, data: T): Promise<number>;
  /**
   *
   * @param string name
   * @param string folder
   * @param Object files
   */
  updateImageFields(
    name: string,
    folder: string,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<number>;
}
