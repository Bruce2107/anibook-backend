import { Request, Response } from 'express';
import { pool } from '../../database';
import { AnimeData } from '../../constants/types/AnimeType';
import { QueryResult } from 'pg';
import search from '../../utils/SearchObjectInArray';

const updateAnyFieldThatAreNotAFile = async (
  request: Request,
  response: Response
) => {
  try {
    const { dados }: AnimeData = request.body;
    const { name } = request.params;

    const anime: QueryResult<AnimeData> = await pool.query(
      `SELECT dados FROM animes WHERE dados ->> 'name' = $1`,
      [name]
    );

    if (!anime.rowCount) {
      return response.sendStatus(404);
    }

    const newData = anime.rows[0].dados;
    if (dados.name) {
      const exist = await pool.query(
        `SELECT id FROM animes WHERE dados ->> 'name' = $1`,
        [dados.name]
      );
      if (dados.name !== name && exist.rowCount)
        return response.sendStatus(409);
      newData.name = dados.name;
    }
    if (dados.synopsis) newData.synopsis = dados.synopsis;
    if (dados.comment) newData.comment = dados.comment;
    if (dados.folder) newData.folder = dados.folder;
    if (dados.info.author) newData.info.author = dados.info.author;
    if (dados.info.status) newData.info.status = dados.info.status;
    if (dados.info.numberEpisodes)
      newData.info.numberEpisodes = dados.info.numberEpisodes;

    if (dados.musics)
      dados.musics.forEach((music) => {
        if (!search(music.url, newData.musics)) newData.musics.push(music);
      });
    if (dados.whereWatch)
      dados.whereWatch.forEach((site) => {
        if (!search(site.url, newData.whereWatch))
          newData.whereWatch.push(site);
      });
    await pool.query(
      `UPDATE animes SET dados = $1 WHERE dados ->> 'name' = $2`,
      [newData, name]
    );
    return response.sendStatus(204);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default updateAnyFieldThatAreNotAFile;
