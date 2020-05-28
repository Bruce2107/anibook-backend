import { Request, Response } from 'express';
import getCardInfo from '../utils/GetCardInformationsAnimeOrMangaByName';
import { Card } from '../../constants/types/DataType';

const getCardInformtionsByName = async (
  request: Request,
  response: Response
): Promise<Response<Card>> => {
  try {
    const { name } = request.params;
    const result = await getCardInfo(name, 'mangas');
    return response.status(result.status).json({ data: result.data });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};
export default getCardInformtionsByName;
