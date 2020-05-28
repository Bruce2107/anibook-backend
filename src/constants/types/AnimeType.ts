import { Data, Info, Link } from './DataType';
import { Manga } from './MangaType';

export interface Anime extends Data {
  info: AnimeInfo;
  whereWatch: Array<Link>;
  musics: Array<Link>;
}

export interface AnimeInfo extends Info {
  numberEpisodes: number;
}

export interface AnimeData{
  dados: Anime
}

export function isAnime(object: Anime | Manga): object is Anime {
  return 'whereWatch' in object;
}
