import AnimeMangaUtilsRepository from '../../usecase/port/AnimeMangaUtilsRepository';
import AnimeMangaAdapter from '../../adapter/anime_manga/repository/DatabaseAnimeManga';
import updatePhotoOrImageField from '../../utils/UpdatePhotoOrImageField';
import Anime from '../../domain/anime';
import Manga from '../../domain/manga';
import { GetResponse, isAnime, searchObjectInArray, isManga } from 'anibook';
import { CardFields } from '../../constants/Card';

export default class AnimeMangaUtils<T extends Anime | Manga>
  implements AnimeMangaUtilsRepository<T> {
  adapter: AnimeMangaAdapter<T>;
  type: string;
  constructor(type: string) {
    this.adapter = new AnimeMangaAdapter<T>();
    this.type = type;
  }
  async _delete(name: string): Promise<404 | 400 | 204> {
    if (!(await this.adapter.alreadyExists(this.type, name))) return 404;
    return (await this.adapter._delete(this.type, name)) ? 204 : 400;
  }

  async create(
    folder: string,
    dados: T,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<422 | 409 | 400 | 201> {
    if (Object.keys(files).length) {
      if (!folder) return 422;
      dados = await updatePhotoOrImageField(files, folder, dados);
    }
    if (await this.adapter.alreadyExists(this.type, dados.name)) return 409;

    return (await this.adapter.insert(this.type, ['dados'], dados)) ? 201 : 400;
  }

  async getCard(name: string): Promise<GetResponse<T>> {
    const card = await this.adapter.getOne(this.type, name, CardFields);
    return card ? { status: 200, data: card } : { status: 404 };
  }

  async getOne(name: string): Promise<GetResponse<T>> {
    const reuslt = await this.adapter.getOne(this.type, name, ['dados']);
    return reuslt ? { status: 200, data: reuslt } : { status: 404 };
  }

  async getRandom(limit: string): Promise<GetResponse<Array<T>>> {
    const result = await this.adapter.getRandom(this.type, limit, ['dados']);
    return {
      status: 200,
      data: result,
      rows: result.length,
    };
  }

  async getRandomCards(limit: string): Promise<GetResponse<Array<T>>> {
    const result = await this.adapter.getRandom(this.type, limit, CardFields);
    return {
      status: 200,
      data: result,
      rows: result.length,
    };
  }

  async updateAnyFieldsThatAreNotAFile(
    name: string,
    data: T
  ): Promise<404 | 409 | 400 | 204> {
    if (!(await this.adapter.alreadyExists(this.type, name))) return 404;
    const newData = (await this.adapter.getOne(this.type, name, [
      'dados',
    ])) as T;
    if (data.name) {
      //já existe outro registro com esse mesmo nome
      if (
        data.name !== name &&
        (await this.adapter.alreadyExists(this.type, data.name))
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
    //alterções para mangá
    if (isManga(newData) && isManga(data)) {
      if (data.info.numberChapters)
        newData.info.numberChapters = data.info.numberChapters;
      if (data.info.numberVolumes)
        newData.info.numberVolumes = data.info.numberVolumes;
      if (data.whereRead)
        data.whereRead.forEach((site) => {
          if (!searchObjectInArray(site.url, newData.whereRead))
            newData.whereRead.push(site);
        });
    }
    return (await this.adapter.update(this.type, name, newData)) ? 204 : 400;
  }

  async updateImageFields(
    name: string,
    folder: string,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<422 | 404 | 400 | 204> {
    if (!files || !folder) return 422;
    if (!(await this.adapter.alreadyExists(this.type, name))) return 404;
    const data = (await this.adapter.getOne(this.type, name, ['dados'])) as T;

    const newData = await updatePhotoOrImageField(files, folder, data);

    return (await this.adapter.update(this.type, name, newData)) ? 204 : 400;
  }
}
