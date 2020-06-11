import { Request, Response } from 'express';

export default interface MixedControllerReposotory {
  getRandom(request: Request, response: Response): Promise<Response>;
  getRandomCard(request: Request, response: Response): Promise<Response>;
}
