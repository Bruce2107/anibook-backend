export default interface AnimeMangaRepository<T> {
  /**
   *
   * @param string `type` Type of data
   * @param string `name` Name to find
   */
  alreadyExists(type: string, name: string): Promise<boolean>;
  /**
   *
   * @param string `type` Type of data
   * @param Array `fields` Fields of the object
   * @param T `data` An object with the data
   */
  insert(type: string, fields: string[], data: T): Promise<boolean>;
  /**
   *
   * @param string `type` Type of data
   * @param string `name` Name of data to be deleted
   */
  _delete(type: string, name: string): Promise<boolean>;
  /**
   * 
   * @param string `type` Type of data 
   * @param string `limit` Limit of results 
   * @param string `sortField` Field to sort 
   * @param Array `fields` Fields of results
   */
  getAllSorted(
    type: string,
    limit: string,
    sortField: string,
    fields: string[]
  ): Promise<Array<T>>;
  /**
   *
   * @param string `type` Type of data
   * @param string `limit` Limit of results
   * @param Array `fields` Fields of results
   */
  getRandom(type: string, limit: string, fields: string[]): Promise<Array<T>>;
  /**
   *
   * @param string `type` Type of data
   * @param string `name` Name to find
   * @param Array `fields` Fields of results
   */
  getOne(type: string, name: string, fields: string[]): Promise<T | null>;
  /**
   *
   * @param string `type` Type of data
   * @param string `name` Name to find
   * @param T `newData` New values
   */
  update(type: string, name: string, newData: T): Promise<boolean>;
}
