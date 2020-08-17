import { Manga } from '@domain/manga';
import { AnimeMangaUtils } from '@utils/AnimeManga';
import { DatabaseAnimeMangaRepository } from '@adapter/anime_manga/repository/DatabaseAnimeManga';
import { DatabaseImage } from '@adapter/image/repository/DatabaseImage';

const databaseMangaRepository = new DatabaseAnimeMangaRepository<Manga>(
  'mangas'
);

const databaseImageRepository = new DatabaseImage();

const mangaUtils = new AnimeMangaUtils(
  databaseMangaRepository,
  databaseImageRepository
);

export { mangaUtils, databaseMangaRepository, databaseImageRepository };
