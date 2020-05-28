import { Request, Response } from 'express';
import update from '../utils/UpdatePhotoAnimeOrManga';

const updatePhoto = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { name } = request.params;
    const { folder } = request.query;
    const file = request.file;

    const status = await update(name, folder as string, file, 'animes');
    return response.sendStatus(status);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default updatePhoto;
