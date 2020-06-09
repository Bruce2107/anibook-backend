import { Manga as IManga, MangaInfo, Link } from 'anibook';

export default class Manga implements IManga {
  comment: string;
  folder?: string;
  images?: Array<string>;
  info: MangaInfo;
  name: string;
  photo: string;
  synopsis: string;
  whereRead?: Array<Link>;

  constructor({
    comment,
    info,
    name,
    photo,
    synopsis,
    folder,
    images,
    whereRead,
  }: IManga) {
    this.comment = comment;
    this.folder = folder;
    this.images = images;
    this.info = info;
    this.name = name;
    this.photo = photo;
    this.synopsis = synopsis;
    this.whereRead = whereRead;
  }
}
