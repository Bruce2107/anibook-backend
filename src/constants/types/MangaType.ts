import { Data, Info, Link } from './DataType';

export interface Anime extends Data {
  info: AnimeInfo;
  whereRead: Array<Link>;
}

export interface AnimeInfo extends Info {
  numberChapters: number;
  numberVolumes: number;
}
