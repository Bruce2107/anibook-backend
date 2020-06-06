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
