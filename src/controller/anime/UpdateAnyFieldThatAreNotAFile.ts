import { Request, Response } from 'express';
import { AnimeData } from '../../constants/types/AnimeType';
import update from '../utils/UpdateAnyFieldThatAreNotAFileAnimeOrManga';

const updateAnyFieldThatAreNotAFile = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { dados }: AnimeData = request.body;
    const { name } = request.params;

    const status = await update(name, dados, 'animes');
    return response.sendStatus(status);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default updateAnyFieldThatAreNotAFile;
