import { Request, Response } from 'express';
import { Card } from '../../constants/types/DataType';
import getCardInfo from '../utils/GetCardInformationsAnimeOrMangaByName';

const getCardInformtionsByName = async (
  request: Request,
  response: Response
): Promise<Response<Card>> => {
  try {
    const { name } = request.params;
    const result = await getCardInfo<Card>(name, 'animes');
    return response.status(result.status).json({ data: result.data });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default getCardInformtionsByName;
