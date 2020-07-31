import { Manga } from '@domain/manga';

export class CreateManga {
  createManga(object: any): Manga {
    return new Manga(object);
  }
}
