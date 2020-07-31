import { Request, Response } from 'express';

export interface ImageControllerRepository {
  insertImage(request: Request, response: Response): Promise<Response>;
  deleteImage(request: Request, response: Response): Promise<Response>;
  getBackground(request: Request, response: Response): Promise<Response>;
  getImage(request: Request, response: Response): Promise<Response>;
}
