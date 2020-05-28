import { Data, Info, Link } from './DataType';
import { Anime } from './AnimeType';

export interface Manga extends Data {
  info: MangaInfo;
  whereRead: Array<Link>;
}

export interface MangaInfo extends Info {
  numberChapters: number;
  numberVolumes: number;
}

export interface MangaData {
  dados: Manga;
}

export function isManga(object: Anime | Manga): object is Manga {
  return 'whereRead' in object;
}
