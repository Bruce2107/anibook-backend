import { Request, Response } from 'express';
import { Card } from '../../constants/types/DataType';
import getRandomCard from '../utils/GetRandomAnimeOrMangaCard';

const GetRandomCardInformations = async (
  request: Request,
  response: Response
): Promise<Response<Array<Card>>> => {
  try {
    const { limit } = request.query;

    const result = await getRandomCard(limit as string, 'mangas');
    return response
      .status(result.status)
      .json({ data: result.data, rows: result.rows });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default GetRandomCardInformations;
