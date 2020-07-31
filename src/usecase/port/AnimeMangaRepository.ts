export interface AnimeMangaRepository<T> {
  /**
   *
   * @param string `name` Name to find
   */
  alreadyExists(name: string): Promise<boolean>;
  /**
   *
   * @param Array `fields` Fields of the object
   * @param T `data` An object with the data
   */
  insert(fields: string[], data: T): Promise<boolean>;
  /**
   *
   * @param string `name` Name of data to be deleted
   */
  _delete(name: string): Promise<boolean>;
  /**
   *
   * @param string `limit` Limit of results
   * @param string `sortField` Field to sort
   * @param Array `fields` Fields of results
   */
  getAllSorted(
    limit: string,
    sortField: string,
    fields: string[]
  ): Promise<Array<T>>;
  /**
   *
   * @param string `limit` Limit of results
   * @param Array `fields` Fields of results
   */
  getRandom(limit: string, fields: string[]): Promise<Array<T>>;
  /**
   *
   * @param string `name` Name to find
   * @param Array `fields` Fields of results
   */
  getOne(name: string, fields: string[]): Promise<T | null>;
  /**
   *
   * @param string `name` Name to find
   * @param T `newData` New values
   */
  update(name: string, newData: T): Promise<boolean>;
}
