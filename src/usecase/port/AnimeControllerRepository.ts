import { Request, Response } from 'express';

export default interface AnimeControllerRepository {
  create(request: Request, response: Response): Promise<Response>;
  _delete(request: Request, response: Response): Promise<Response>;
  getCardByName(request: Request, response: Response): Promise<Response>;
  getAnimeByName(request: Request, response: Response): Promise<Response>;
  getRandomAnimes(request: Request, response: Response): Promise<Response>;
  getRandomCards(request: Request, response: Response): Promise<Response>;
  updateAnyFieldThatAreNotAFile(
    request: Request,
    response: Response
  ): Promise<Response>;
  updateImageField(request: Request, response: Response): Promise<Response>;
}
