import { MusicRepository } from '@adapter/udesc/music/MusicRepository';
import { Request, Response } from 'express';

export class DeleteMusicController {
  constructor(private deleteMusicUseCase: DeleteMusicUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      return (await this.deleteMusicUseCase.execute(id))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteMusicUseCase {
  constructor(private musicRepository: MusicRepository) {}

  async execute(id: string) {
    return this.musicRepository._delete(id);
  }
}
