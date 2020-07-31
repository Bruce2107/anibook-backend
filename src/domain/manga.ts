import { Manga as IManga, MangaInfo, Link } from 'anibook';

/**
 * @property `string` comment
 * @property `string` folder
 * @property `Array` images
 * @property `MangaInfo` info
 * @property `string` name
 * @property `string` photo
 * @property `string` synopsis
 * @property `Array` whereRead
 */
export class Manga implements IManga {
  comment: string;
  folder?: string;
  images?: Array<string>;
  info: MangaInfo;
  name: string;
  photo: string;
  synopsis: string;
  whereRead: Array<Link>;

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

export default Manga;
