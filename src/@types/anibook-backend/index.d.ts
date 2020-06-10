/// <reference types="typescript" />

import { Request, Response } from 'express';
import { Card } from 'anibook';

export interface IMixed {
  getRandom<T>(request: Request, response: Response): Promise<Response>;
  getRandomCard(request: Request, response: Response): Promise<Response>;
}

export interface IImage {
  createImage(request: Request, response: Response): Promise<Response>;
  deleteImage(request: Request, response: Response): Promise<Response>;
  getBackground(request: Request, response: Response): Promise<Response>;
  getImage(request: Request, response: Response): Promise<Response>;
}

export interface IToken {
  createUser(request: Request, response: Response): Promise<Response>;
  getToken(request: Request, response: Response): Promise<Response>;
}

export interface IAnime_Manga {
  create<T>(request: Request, response: Response): Promise<Response>;
  _delete(request: Request, response: Response): Promise<Response>;
  getCardByName(request: Request, response: Response): Promise<Response<Card>>;
  getOneByName<T>(request: Request, response: Response): Promise<Response<T>>;
  getRandom<T>(
    request: Request,
    response: Response
  ): Promise<Response<Array<T>>>;
  getRandomCard(
    request: Request,
    response: Response
  ): Promise<Response<Array<Card>>>;
  updateAnyFieldThatAreNotAFile<T>(
    request: Request,
    response: Response
  ): Promise<Response>;
  updateImageFields(request: Request, response: Response): Promise<Response>;
}

export interface AnimeMangaRepository {
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
  insert<T>(type: string, fields: string[], data: T): Promise<boolean>;
  /**
   *
   * @param string `type` Type of data
   * @param string `name` Name of data to be deleted
   */
  _delete(type: string, name: string): Promise<boolean>;
  /**
   *
   * @param string `type` Type of data
   * @param number `limit` Limit of results
   * @param Array `fields` Fields of results
   */
  getRandom<T>(type: string, limit: number, fields: string[]): Promise;
  /**
   *
   * @param string `type` Type of data
   * @param string `name` Name to find
   * @param Array `fields` Fields of results
   */
  getOne<T>(type: string, name: string, fields: string[]): Promise;
  /**
   *
   * @param string `type` Type of data
   * @param string `name` Name to find
   * @param T `newData` New values
   */
  update<T>(type: string, name: string, newData: T): Promise;
}
