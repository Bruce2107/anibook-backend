import { Request, Response } from 'express';
import { GetImageUseCase } from './GetImageUseCase';

export class GetImageController {
  constructor(private getImageUseCase: GetImageUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const { folder, name } = request.params;
      const result = await this.getImageUseCase.execute(folder, name);
      if (result) {
        response.contentType(result.contentType);
        return response.send(result.image);
      }
      return response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
