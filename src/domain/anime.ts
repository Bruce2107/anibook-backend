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
export default class Anime implements IAnime {
  folder?: string;
  name: string;
  photo: string;
  images?: Array<string>;
  synopsis: string;
  comment: string;
  info: AnimeInfo;
  whereWatch: Array<Link>;
  musics?: Array<Link>;

  constructor({
    comment,
    name,
    photo,
    synopsis,
    whereWatch,
    info,
    folder,
    images,
    musics,
  }: IAnime) {
    this.comment = comment;
    this.folder = folder;
    this.images = images;
    this.info = info;
    this.musics = musics;
    this.name = name;
    this.photo = photo;
    this.synopsis = synopsis;
    this.whereWatch = whereWatch;
  }
}
