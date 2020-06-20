import Anime from '@domain/anime';

export default class CreateAnime {
  createAnime(object: any): Anime {
    return new Anime(object);
  }
}
