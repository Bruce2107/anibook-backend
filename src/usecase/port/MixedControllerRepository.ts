import { Request, Response } from 'express';

export interface MixedControllerRepository {
  getRandom(request: Request, response: Response): Promise<Response>;
  getRandomCard(request: Request, response: Response): Promise<Response>;
}
