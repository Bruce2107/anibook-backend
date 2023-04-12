import { MusicRepository } from '@adapter/udesc/music/MusicRepository';
import { Music } from '@domain/udesc/music';
import { Request, Response } from 'express';

export class CreateMusicController {
  constructor(private createMusicUseCase: CreateMusicUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, link, idLanguage, idSerie } = request.body as Music;

      if (!name || !link || !idLanguage || !idSerie)
        return response.sendStatus(422);

      const result = await this.createMusicUseCase.execute(
        name,
        link,
        idLanguage,
        idSerie
      );
      return response.sendStatus(result ? 201 : 409);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class CreateMusicUseCase {
  constructor(private musicRepository: MusicRepository) {}
  async execute(
    name: string,
    link: string,
    idLanguage: number,
    idSerie: number
  ) {
    return await this.musicRepository.insertOne(
      new Music({ name, link, idLanguage, idSerie })
    );
  }
}
