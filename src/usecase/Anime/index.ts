import { AnimeMangaUtils } from '@utils/AnimeManga';
import { Anime } from '@domain/anime';
import { DatabaseAnimeMangaRepository } from '@adapter/anime_manga/repository/DatabaseAnimeManga';
import { DatabaseImage } from '@adapter/image/repository/DatabaseImage';

const databaseAnimeRepository = new DatabaseAnimeMangaRepository<Anime>(
  'animes'
);

const databaseImageRepository = new DatabaseImage();

const animeUtils = new AnimeMangaUtils(
  databaseAnimeRepository,
  databaseImageRepository
);

export { animeUtils, databaseAnimeRepository, databaseImageRepository };
