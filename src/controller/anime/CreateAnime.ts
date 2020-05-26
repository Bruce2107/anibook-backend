import { Request, Response } from 'express';
import { pool } from '../../database';
import { Anime } from '../../constants/types/AnimeType';
import { FileMulter } from '../../constants/types/ImageType';
import { QueryResult } from 'pg';
import saveImages from '../../utils/SaveImageOnDatabase';

const createAnime = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const dados: Anime = JSON.parse(request.body.dados);
    const files = request.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (Object.keys(files).length) {
      const { folder } = request.query;
      dados.folder = folder as string;
      if (Object.keys(files).includes('card')) {
        const card: FileMulter = files['card'][0];
        dados.photo = card.originalname;
        await saveImages(folder as string, card, undefined)
      }
      if (Object.keys(files).includes('images')) {
        const images: FileMulter[] = files['images'];
        dados.images = images.map((image) => image.originalname);
        await saveImages(folder as string, undefined, images)
      }
    }

    const exists: QueryResult = await pool.query(
      `SELECT id FROM animes WHERE dados ->> 'name' = $1`,
      [dados.name]
    );
    if (!exists.rowCount) {
      await pool.query('INSERT INTO animes (dados) VALUES ($1)', [dados]);
      return response.sendStatus(201);
    } else {
      return response.sendStatus(409);
    }
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default createAnime;
