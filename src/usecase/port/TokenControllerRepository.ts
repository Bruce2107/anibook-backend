import { Request, Response } from 'express';

export interface TokenControllerRepository {
  createUser(request: Request, response: Response): Promise<Response>;
  getToken(request: Request, response: Response): Promise<Response>;
}
