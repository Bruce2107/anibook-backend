import { Request, Response } from 'express';

export default interface Iimage {
  createImage(request: Request, response: Response): Promise<Response>;
  deleteImage(request: Request, response: Response): Promise<Response>;
  getBackground(request: Request, response: Response): Promise<Response>;
  getImage(request: Request, response: Response): Promise<Response>;
}
