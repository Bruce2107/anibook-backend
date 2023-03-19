import { Request, Response } from 'express';
import { GetBackgroundUseCase } from './GetBackgroundUseCase';

export class GetBackgroundController {
  constructor(private getBackgroundUseCase: GetBackgroundUseCase) {}

  async handle(_: Request, response: Response) {
    try {
      const randomRow = await this.getBackgroundUseCase.execute();
      if (!randomRow) return response.sendStatus(404);
      response.contentType(randomRow.contentType);
      return response.send(randomRow.image);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
