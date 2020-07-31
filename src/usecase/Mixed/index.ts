import { Request, Response } from 'express';
import { mergeArray, limits as getLimit } from 'anibook';
import { Card } from '@domain/card';
import { AnimeMangaUtils } from '@utils/AnimeManga';
import { MixedControllerRepository } from '@usecase/port/MixedControllerRepository';
import { DatabaseImage } from '@adapter/image/repository/DatabaseImage';
import { DatabaseAnimeMangaRepository } from '@adapter/anime_manga/repository/DatabaseAnimeManga';
import { Anime } from '@domain/anime';
import { Manga } from '@domain/manga';

type MyType = { type: string };
interface MyAnime extends Anime, MyType {}

interface MyManga extends Manga, MyType {}

interface MyCard extends Card, MyType {}

type Mixed = MyAnime | MyManga;

export class MixedController implements MixedControllerRepository {
  async getRandom(request: Request, response: Response): Promise<Response> {
    const animeUtils = new AnimeMangaUtils(
      new DatabaseAnimeMangaRepository<Anime>('animes'),
      new DatabaseImage()
    );
    const mangaUtils = new AnimeMangaUtils(
      new DatabaseAnimeMangaRepository<Manga>('mangas'),
      new DatabaseImage()
    );
    try {
      const { limit } = request.query;

      const { limitAnime, limitManga } = getLimit(Number(limit as string));

      const resultAnime = await animeUtils.getRandom(String(limitAnime));
      const resultManga = await mangaUtils.getRandom(String(limitManga));
      let animes: MyAnime[] = [];
      let mangas: MyManga[] = [];
      if (resultAnime.data) {
        animes = resultAnime.data.map((anime) => ({ ...anime, type: 'anime' }));
      }
      if (resultManga.data) {
        mangas = resultManga.data.map((anime) => ({ ...anime, type: 'manga' }));
      }
      const resultMerged = mergeArray(animes as Mixed[], mangas as Mixed[]);

      return response
        .status(200)
        .json({ data: resultMerged, rows: resultMerged.length });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getRandomCard(request: Request, response: Response): Promise<Response> {
    const animeUtils = new AnimeMangaUtils(
      new DatabaseAnimeMangaRepository<Anime>('animes'),
      new DatabaseImage()
    );
    const mangaUtils = new AnimeMangaUtils(
      new DatabaseAnimeMangaRepository<Manga>('mangas'),
      new DatabaseImage()
    );
    try {
      const { limit } = request.query;

      const { limitAnime, limitManga } = getLimit(Number(limit as string));

      const resultAnime = await animeUtils.getRandomCards(String(limitAnime));
      const resultManga = await mangaUtils.getRandomCards(String(limitManga));
      let animes: MyAnime[] = [];
      let mangas: MyManga[] = [];
      if (resultAnime.data) {
        animes = resultAnime.data.map((anime) => ({ ...anime, type: 'anime' }));
      }
      if (resultManga.data) {
        mangas = resultManga.data.map((anime) => ({ ...anime, type: 'manga' }));
      }
      const resultMerged = mergeArray(animes as MyCard[], mangas as MyCard[]);

      return response
        .status(200)
        .json({ data: resultMerged, rows: resultMerged.length });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }
}
