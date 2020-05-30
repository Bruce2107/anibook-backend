import { Request, Response } from 'express';
import _delete from '../utils/DeleteAnimeOrManga';

async function deleteAnime(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const { name } = request.params;
    const table = request.path.split('/')[1];

    const status = await _delete(name, table);
    return response.sendStatus(status);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
}

export default deleteAnime;
