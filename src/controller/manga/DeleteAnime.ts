import { Request, Response } from 'express';
import _delete from '../utils/DeleteAnimeOrManga';

const deleteManga = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { name } = request.params;

    const status = await _delete(name, 'mangas');

    return response.sendStatus(status);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default deleteManga;
