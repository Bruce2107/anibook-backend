import { SerieRepository } from '@adapter/udesc/serie/SerieRepository';
import { Serie } from '@domain/udesc/serie';
import { Request, Response } from 'express';

export class CreateSerieController {
  constructor(private createSerieUseCase: CreateSerieUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        comment,
        cover,
        idStudio,
        numberOfEpisodes,
        status,
        synopsis,
      } = request.body as Serie;

      if (!name || !comment || !idStudio || !synopsis)
        return response.sendStatus(422);

      const result = await this.createSerieUseCase.execute({
        name,
        comment,
        cover: cover || 0,
        idStudio,
        numberOfEpisodes: numberOfEpisodes || 0,
        status: status || 1,
        synopsis,
      });
      return response.sendStatus(result ? 201 : 409);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class CreateSerieUseCase {
  constructor(private serieRepository: SerieRepository) {}
  async execute({ ...props }: Serie) {
    return await this.serieRepository.insertOne(new Serie(props));
  }
}
