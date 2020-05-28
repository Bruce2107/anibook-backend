import { Request, Response } from 'express';
import _delete from '../utils/DeleteAnimeOrManga';

const deleteAnime = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { name } = request.params;

    const status = await _delete(name, 'animes');
    return response.sendStatus(status);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default deleteAnime;
