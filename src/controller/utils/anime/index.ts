import { GetResponse, isAnime, searchObjectInArray } from 'anibook';
import AnimeAdapter from '../../../adapter/anime/repository/DatabaseAnime';
import Anime from '../../../domain/anime';
import updatePhotoOrImageField from '../../../utils/UpdatePhotoOrImageField';
import { CardFields } from '../../../constants/Card';
import AnimeUtilsRepository from '../../../usecase/port/AnimeUtilsRepository';

export default class AnimeUtils implements AnimeUtilsRepository {
  adapter: AnimeAdapter;
  constructor() {
    this.adapter = new AnimeAdapter();
  }

  async create(
    folder: string,
    dados: Anime,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<422 | 409 | 400 | 201> {
    if (Object.keys(files).length) {
      if (!folder) return 422;
      dados = await updatePhotoOrImageField(files, folder, dados);
    }
    if (await this.adapter.alreadyExists('animes', dados.name)) return 409;

    return (await this.adapter.insert('animes', ['dados'], dados)) ? 201 : 400;
  }

  async _delete(name: string): Promise<404 | 400 | 204> {
    if (!(await this.adapter.alreadyExists('animes', name))) return 404;
    return (await this.adapter._delete('animes', name)) ? 204 : 400;
  }

  async getCard(name: string): Promise<GetResponse<Anime>> {
    const card = await this.adapter.getOne('animes', name, CardFields);
    return card ? { status: 200, data: card } : { status: 404 };
  }

  async getAnime(name: string): Promise<GetResponse<Anime>> {
    const anime = await this.adapter.getOne('animes', name, ['dados']);
    return anime ? { status: 200, data: anime } : { status: 404 };
  }

  async getRandomAnimes(limit: number): Promise<GetResponse<Array<Anime>>> {
    const animes = await this.adapter.getRandom('animes', limit, ['dados']);
    return {
      status: 200,
      data: animes,
      rows: animes.length,
    };
  }

  async getRandomCards(limit: number): Promise<GetResponse<Array<Anime>>> {
    const animes = await this.adapter.getRandom('animes', limit, CardFields);
    return {
      status: 200,
      data: animes,
      rows: animes.length,
    };
  }

  async updateAnyFieldsThatAreNotAFile(
    name: string,
    data: Anime
  ): Promise<404 | 409 | 400 | 204> {
    if (!(await this.adapter.alreadyExists('animes', name))) return 404;
    const newData = (await this.adapter.getOne('animes', name, [
      'dados',
    ])) as Anime;
    if (data.name) {
      //já existe outro registro com esse mesmo nome
      if (
        data.name !== name &&
        (await this.adapter.alreadyExists('animes', data.name))
      )
        return 409;
      newData.name = data.name;
    }
    if (data.synopsis) newData.synopsis = data.synopsis;
    if (data.comment) newData.comment = data.comment;
    if (data.folder) newData.folder = data.folder;
    if (data.info.author) newData.info.author = data.info.author;
    if (data.info.status) newData.info.status = data.info.status;

    //alterções para anime
    if (isAnime(newData) && isAnime(data)) {
      if (data.info.numberEpisodes)
        newData.info.numberEpisodes = data.info.numberEpisodes;

      if (data.musics)
        data.musics.forEach((music) => {
          if (newData.musics && !searchObjectInArray(music.url, newData.musics))
            newData.musics.push(music);
        });
      if (data.whereWatch)
        data.whereWatch.forEach((site) => {
          if (!searchObjectInArray(site.url, newData.whereWatch))
            newData.whereWatch.push(site);
        });
    }
    return (await this.adapter.update('animes', name, newData)) ? 204 : 400;
  }

  async updateImageFields(
    name: string,
    folder: string,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<422 | 404 | 400 | 204> {
    if (!files || !folder) return 422;
    if (!(await this.adapter.alreadyExists('animes', name))) return 404;
    const data = (await this.adapter.getOne('animes', name, [
      'dados',
    ])) as Anime;

    const newData = await updatePhotoOrImageField(files, folder, data);

    return (await this.adapter.update('animes', name, newData)) ? 204 : 400;
  }
}
