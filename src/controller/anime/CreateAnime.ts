import { Request, Response } from 'express';
import { pool } from '../../database';
import { Anime } from '../../constants/types/AnimeType';
import { FileMulter } from '../../constants/types/DataType';
import { QueryResult } from 'pg';

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
      }
      if (Object.keys(files).includes('images')) {
        const images: FileMulter[] = files['images'];
        dados.images = images.map((image) => image.originalname);
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
    return response.status(400).json({ error });
  }
};

export default createAnime;
