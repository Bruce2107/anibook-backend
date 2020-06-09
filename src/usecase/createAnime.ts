import { Anime as IAnime } from 'anibook';
import Anime from '../domain/anime';

export default class CreateAnime {
  createAnime(object: IAnime): Anime {
    return new Anime(object);
  }
}
