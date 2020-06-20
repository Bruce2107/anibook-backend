import Manga from '@domain/manga';

export default class CreateManga {
  createManga(object: any): Manga {
    return new Manga(object);
  }
}
