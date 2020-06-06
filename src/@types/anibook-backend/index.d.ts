/// <reference types="typescript" />

import { Request, Response } from 'express';

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
