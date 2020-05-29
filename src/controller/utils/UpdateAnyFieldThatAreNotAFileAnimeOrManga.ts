import { QueryResult } from 'pg';
import { AnimeData, Anime, isAnime } from '../../constants/types/AnimeType';
import { MangaData, Manga, isManga } from '../../constants/types/MangaType';
import { pool } from '../../database';
import search from '../../utils/SearchObjectInArray';

const updateAnyFieldThatAreNotAFile = async (
  name: string,
  dados: Anime | Manga,
  table: string
) => {
  const exists: QueryResult<
    AnimeData | MangaData
  > = await pool.query(
    `SELECT dados FROM ${table} WHERE dados ->> 'name' = $1`,
    [name]
  );

  if (!exists.rowCount) {
    return 404;
  }
  const newData = exists.rows[0].dados;
  if (dados.name) {
    const exist: QueryResult<Number> = await pool.query(
      `SELECT id FROM ${table} WHERE dados ->> 'name' = $1`,
      [dados.name]
    );
    //já existe outro registro com esse mesmo nome
    if (dados.name !== name && exist.rowCount) return 409;
    newData.name = dados.name;
  }
  if (dados.synopsis) newData.synopsis = dados.synopsis;
  if (dados.comment) newData.comment = dados.comment;
  if (dados.folder) newData.folder = dados.folder;
  if (dados.info.author) newData.info.author = dados.info.author;
  if (dados.info.status) newData.info.status = dados.info.status;
  //alterções para anime
  if (isAnime(newData) && isAnime(dados)) {
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
  }
  //alterções para mangá
  if (isManga(newData) && isManga(dados)) {
    if (dados.info.numberChapters)
      newData.info.numberChapters = dados.info.numberChapters;
    if (dados.info.numberVolumes)
      newData.info.numberVolumes = dados.info.numberVolumes;
    if (dados.whereRead)
      dados.whereRead.forEach((site) => {
        if (!search(site.url, newData.whereRead)) newData.whereRead.push(site);
      });
  }

  await pool.query(
    `UPDATE ${table} SET dados = $1 WHERE dados ->> 'name' = $2`,
    [newData, name]
  );
  return 204;
};

export default updateAnyFieldThatAreNotAFile;
