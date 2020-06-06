import { Request, Response } from 'express';
import { Data, mergeArray, limits as getLimit, Card } from 'anibook';
import { IMixed } from '../../@types/anibook-backend';
import getRandomData from '../utils/GetAllAnimesOrManga';
import getRandomCard from '../utils/GetRandomAnimeOrMangaCard';
class Mixed implements IMixed {
  async getRandom<T extends Data>(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { limit } = request.query;

      const { limitAnime, limitManga } = getLimit(Number(limit as string));

      const resultAnime = await getRandomData<T>(String(limitAnime), 'animes');
      const resultManga = await getRandomData<T>(String(limitManga), 'mangas');
      const resultMerged = mergeArray(
        resultAnime.data as [],
        resultManga.data as []
      );

      return response
        .status(200)
        .json({ data: resultMerged, rows: resultMerged.length });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }
  
  async getRandomCard(request: Request, response: Response): Promise<Response> {
    try {
      const { limit } = request.query;

      const { limitAnime, limitManga } = getLimit(Number(limit as string));

      const resultAnime = await getRandomCard<Card>(
        String(limitAnime),
        'animes'
      );
      const resultManga = await getRandomCard<Card>(
        String(limitManga),
        'mangas'
      );
      const resultMerged = mergeArray(
        resultAnime.data as Card[],
        resultManga.data as Card[]
      );

      return response
        .status(200)
        .json({ data: resultMerged, rows: resultMerged.length });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }
}

export default new Mixed();
