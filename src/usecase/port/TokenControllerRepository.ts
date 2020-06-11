import { Request, Response } from 'express';

export default interface TokenControllerRepository{
  createUser(request: Request, response: Response): Promise<Response>
  getToken(request: Request, response: Response): Promise<Response>
}