import { Link, AnimeInfo, Anime as IAnime } from 'anibook';

/**
 * @property `string` folder
 * @property `string` name
 * @property `string` photo
 * @property `Array` images
 * @property `string` synopsis
 * @property `string` comment
 * @property `AnimeInfo` info
 * @property `Array` whereWatch
 * @property `Array` musics
 */
export class Anime implements IAnime {
  folder?: string;
  name: string;
  photo: string;
  images?: Array<string>;
  synopsis: string;
  comment: string;
  info: AnimeInfo;
  whereWatch: Array<Link>;
  musics?: Array<Link>;

  constructor({ ...props }: Anime) {
    Object.assign(this, props);
  }
}
