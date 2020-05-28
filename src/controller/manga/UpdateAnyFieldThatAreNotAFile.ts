import { Request, Response } from 'express';
import { MangaData } from '../../constants/types/MangaType';
import update from '../utils/UpdateAnyFieldThatAreNotAFileAnimeOrManga';

const updateAnyFieldThatAreNotAFile = async (
  request: Request,
  response: Response
) => {
  try {
    const { dados }: MangaData = request.body;
    const { name } = request.params;
    
    const status = await update(name, dados, 'mangas');
    return response.sendStatus(status);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default updateAnyFieldThatAreNotAFile;
