import { Request, Response } from 'express';
import { GetRandomMixedUseCase } from './GetRandomMixedUseCase';

export class GetRandomMixedController {
  constructor(private getRandomMixedUseCase: GetRandomMixedUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { limit } = request.query;
      const result = await this.getRandomMixedUseCase.execute(limit as string);
      return response.status(200).json({ data: result, rows: result.length });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }
}
