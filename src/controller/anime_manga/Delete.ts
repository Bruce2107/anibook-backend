import { Request, Response } from 'express';
import deleteAnimeOrManga from '../utils/DeleteAnimeOrManga';

async function _delete(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const { name } = request.params;

    // Get the database table from path request
    const table = request.path.split('/')[1];

    const status = await deleteAnimeOrManga(name, table);
    return response.sendStatus(status);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
}

export default _delete;
