import Anime from '../../domain/anime';

export default interface AnimeRepository {
  findNAnimes(): Anime[];
}
