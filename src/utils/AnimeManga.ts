import { GetResponse, isAnime, searchObjectInArray, isManga } from 'anibook';
import { AnimeMangaUtilsRepository } from '@usecase/port/AnimeMangaUtilsRepository';
import { updatePhotoOrImageField } from '@utils/UpdatePhotoOrImageField';
import { Anime } from '@domain/anime';
import { Manga } from '@domain/manga';
import { CardFields } from '@constants/Card';
import { AnimeMangaRepository } from '@usecase/port/AnimeMangaRepository';
import { ImageRepository } from '@usecase/port/ImageRepository';

export class AnimeMangaUtils<T extends Anime | Manga>
  implements AnimeMangaUtilsRepository<T> {
  adapter: AnimeMangaRepository<T>;
  imageAdapter: ImageRepository;
  constructor(adapter: AnimeMangaRepository<T>, imageAdapter: ImageRepository) {
    this.adapter = adapter;
    this.imageAdapter = imageAdapter;
  }
  async _delete(name: string): Promise<404 | 204> {
    if (!(await this.adapter.alreadyExists(name))) return 404;
    await this.adapter._delete(name);
    return 204;
  }

  async create(
    folder: string,
    dados: T,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<422 | 409 | 201> {
    if (Object.keys(files).length) {
      if (!folder) return 422;
      dados = await updatePhotoOrImageField(
        files,
        folder,
        dados,
        this.imageAdapter
      );
    }
    dados.name = dados.name.trim();
    if (await this.adapter.alreadyExists(dados.name)) return 409;
    await this.adapter.insert(['dados'], dados);
    return 201;
  }

  async getCard(name: string): Promise<GetResponse<T>> {
    const card = await this.adapter.getOne(name, CardFields);
    return card ? { status: 200, data: card } : { status: 404 };
  }

  async getOne(name: string): Promise<GetResponse<T>> {
    const result = await this.adapter.getOne(name, ['dados']);
    return result ? { status: 200, data: result } : { status: 404 };
  }

  async getRandom(limit: string): Promise<GetResponse<Array<T>>> {
    const result = await this.adapter.getRandom(limit, ['dados']);
    return {
      status: 200,
      data: result,
      rows: result.length,
    };
  }

  async getRandomCards(limit: string): Promise<GetResponse<Array<T>>> {
    const result = await this.adapter.getRandom(limit, CardFields);
    return {
      status: 200,
      data: result,
      rows: result.length,
    };
  }

  async getSort(
    limit: string,
    sortField: string
  ): Promise<GetResponse<Array<T>>> {
    const result = await this.adapter.getAllSorted(limit, sortField, ['dados']);
    return {
      status: 200,
      data: result,
      rows: result.length,
    };
  }

  async getSortCard(
    limit: string,
    sortField: string
  ): Promise<GetResponse<Array<T>>> {
    const result = await this.adapter.getAllSorted(
      limit,
      sortField,
      CardFields
    );
    return {
      status: 200,
      data: result,
      rows: result.length,
    };
  }

  async updateAnyFieldsThatAreNotAFile(
    name: string,
    data: T
  ): Promise<404 | 409 | 204> {
    if (!(await this.adapter.alreadyExists(name))) return 404;
    const newData = (await this.adapter.getOne(name, ['dados'])) as T;
    /* istanbul ignore else */
    if (data.name) {
      // já existe outro registro com esse mesmo nome
      if (data.name !== name && (await this.adapter.alreadyExists(data.name)))
        return 409;
      newData.name = data.name;
    }
    /* istanbul ignore else */
    if (data.synopsis) newData.synopsis = data.synopsis;
    /* istanbul ignore else */
    if (data.comment) newData.comment = data.comment;
    /* istanbul ignore else */
    if (data.folder) newData.folder = data.folder;
    /* istanbul ignore else */
    if (data.info.author) newData.info.author = data.info.author;
    /* istanbul ignore else */
    if (data.info.status) newData.info.status = data.info.status;

    // alterações para anime
    if (isAnime(newData) && isAnime(data)) {
      /* istanbul ignore else */
      if (data.info.numberEpisodes)
        newData.info.numberEpisodes = data.info.numberEpisodes;
      /* istanbul ignore else */
      if (data.musics)
        data.musics.forEach((music) => {
          /* istanbul ignore else */
          if (newData.musics && !searchObjectInArray(music.url, newData.musics))
            newData.musics.push(music);
        });
      /* istanbul ignore else */
      if (data.whereWatch)
        data.whereWatch.forEach((site) => {
          /* istanbul ignore else */
          if (!searchObjectInArray(site.url, newData.whereWatch))
            newData.whereWatch.push(site);
        });
    }
    // alterações para mangá
    if (isManga(newData) && isManga(data)) {
      /* istanbul ignore else */
      if (data.info.numberChapters)
        newData.info.numberChapters = data.info.numberChapters;
      /* istanbul ignore else */
      if (data.info.numberVolumes)
        newData.info.numberVolumes = data.info.numberVolumes;
      /* istanbul ignore else */
      if (data.whereRead)
        data.whereRead.forEach((site) => {
          /* istanbul ignore else */
          if (!searchObjectInArray(site.url, newData.whereRead))
            newData.whereRead.push(site);
        });
    }
    await this.adapter.update(name, newData);
    return 204;
  }

  async updateImageFields(
    name: string,
    folder: string,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<422 | 404 | 204> {
    if (!files || !folder) return 422;
    if (!(await this.adapter.alreadyExists(name))) return 404;
    const data = (await this.adapter.getOne(name, ['dados'])) as T;

    const newData = await updatePhotoOrImageField(
      files,
      folder,
      data,
      this.imageAdapter
    );
    await this.adapter.update(name, newData);
    return 204;
  }
}
