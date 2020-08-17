import { Manga } from '@domain/manga';
import { Files } from '@constants/Files';
import { AnimeMangaUtils } from '@utils/AnimeManga';

export class CreateMangaUseCase {
  constructor(private animeUtils: AnimeMangaUtils<Manga>) {}
  async execute(data: Manga, files: Files, folder: string) {
    return await this.animeUtils.create(folder, data, files);
  }
}
