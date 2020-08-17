import { Anime } from '@domain/anime';

export class CreateAnime {
  createAnime(object: any): Anime {
    return new Anime(object);
  }
}
