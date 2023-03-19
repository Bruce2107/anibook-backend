import { Request, Response } from 'express';
import { DeleteImageUseCase } from './DeleteImageUseCase';

export class DeleteImageController {
  constructor(private deleteImageUseCase: DeleteImageUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const { folder, name } = request.params;

      return (await this.deleteImageUseCase.execute(folder, name))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
