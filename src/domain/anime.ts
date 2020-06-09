import { Link, AnimeInfo, Anime as IAnime } from 'anibook';

export default class Anime {
  folder?: string;
  name: string;
  photo: string;
  images?: Array<string>;
  synopsis: string;
  comment: string;
  info: AnimeInfo;
  whereWatch?: Array<Link>;
  musics?: Array<Link>;
  
  constructor({
    comment,
    name,
    photo,
    synopsis,
    info,
    folder,
    images,
    whereWatch,
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
