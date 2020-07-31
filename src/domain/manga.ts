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

  constructor({ ...props }: Manga) {
    Object.assign(this, props);
  }
}

export default Manga;
