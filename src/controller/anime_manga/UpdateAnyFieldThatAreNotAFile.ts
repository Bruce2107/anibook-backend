import { Request, Response } from 'express';
import { Dados, Anime, Manga } from 'anibook';
import update from '../utils/UpdateAnyFieldThatAreNotAFileAnimeOrManga';

async function updateAnyFieldThatAreNotAFile<T extends Anime | Manga>(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const { dados }: Dados<T> = request.body;
    const { name } = request.params;

    // Get the database table from path request
    const table = request.path.split('/')[1];

    const status = await update(name, dados, table);
    return response.sendStatus(status);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
}

export default updateAnyFieldThatAreNotAFile;
