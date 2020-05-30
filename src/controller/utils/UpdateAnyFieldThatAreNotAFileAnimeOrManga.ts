import { Anime, isAnime } from '../../constants//Anime';
import { Manga, isManga } from '../../constants//Manga';
import search from '../../utils/SearchObjectInArray';
import { alreadyExists, getOne, update } from './database/Methods';

async function updateAnyFieldThatAreNotAFile<T extends Anime | Manga>(
  name: string,
  dados: T,
  table: string
): Promise<404 | 409 | 400 | 204> {
  if (!(await alreadyExists(table, name))) return 404;
  const newData = (await getOne<{ dados: T }>(table, name, ['dados'])).rows[0]
    .dados;

  if (dados.name) {
    //já existe outro registro com esse mesmo nome
    if (dados.name !== name && (await alreadyExists(table, dados.name)))
      return 409;
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

  return (await update<T>(table, name, newData)) ? 204 : 400;
}

export default updateAnyFieldThatAreNotAFile;
