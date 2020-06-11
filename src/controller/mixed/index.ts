import { Request, Response } from 'express';
import { mergeArray, limits as getLimit } from 'anibook';
import Card from '../../domain/card';
import MixedUtils from '../utils/AnimeManga';
import MixedControllerRepository from '../../usecase/port/MixedControllerRepository';

export default class MixedController implements MixedControllerRepository {
  async getRandom(request: Request, response: Response): Promise<Response> {
    const animeUtils = new MixedUtils('animes');
    const mangaUtils = new MixedUtils('mangas');
    try {
      const { limit } = request.query;

      const { limitAnime, limitManga } = getLimit(Number(limit as string));

      const resultAnime = await animeUtils.getRandom(String(limitAnime));
      const resultManga = await mangaUtils.getRandom(String(limitManga));
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
    const animeUtils = new MixedUtils('animes');
    const mangaUtils = new MixedUtils('mangas');
    try {
      const { limit } = request.query;

      const { limitAnime, limitManga } = getLimit(Number(limit as string));

      const resultAnime = await animeUtils.getRandomCards(String(limitAnime));
      const resultManga = await mangaUtils.getRandomCards(String(limitManga));
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
