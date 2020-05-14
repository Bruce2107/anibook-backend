import { Data, Info, Link } from './DataType';

export interface Anime extends Data {
  info: AnimeInfo;
  whereWatch: Array<Link>;
  musics: Array<Link>;
}

export interface AnimeInfo extends Info {
  numberEpisodes: number;
}
