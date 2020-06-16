import { Request, Response } from 'express';

export default interface AnimeMangaControllerRepository {
  create(request: Request, response: Response): Promise<Response>;
  _delete(request: Request, response: Response): Promise<Response>;
  getCardByName(request: Request, response: Response): Promise<Response>;
  getByName(request: Request, response: Response): Promise<Response>;
  getRandom(request: Request, response: Response): Promise<Response>;
  getRandomCards(request: Request, response: Response): Promise<Response>;
  getSort(request: Request, response: Response): Promise<Response>;
  getSortCard(request: Request, response: Response): Promise<Response>;
  updateAnyFieldThatAreNotAFile(
    request: Request,
    response: Response
  ): Promise<Response>;
  updateImageField(request: Request, response: Response): Promise<Response>;
}
