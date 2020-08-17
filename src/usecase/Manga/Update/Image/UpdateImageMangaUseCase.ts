import { AnimeMangaUtils } from '@utils/AnimeManga';
import { Manga } from '@domain/manga';
import { Files } from '@constants/Files';

export class UpdateImageMangaUseCase {
  constructor(private mangaUtils: AnimeMangaUtils<Manga>) {}
  async execute(name: string, folder: string, files: Files) {
    const result = await this.mangaUtils.updateImageFields(name, folder, files);
    return result;
  }
}
