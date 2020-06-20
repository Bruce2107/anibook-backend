import AnimeRepository from '@usecase/port/AnimeMangaRepository';
import Anime from '@domain/anime';
import SortArray from '@utils/SortArray';

export default class InMemoryAnimeReposiory implements AnimeRepository<Anime> {
  animes: Anime[] = [];
  constructor(animes: Anime[]) {
    this.animes = animes;
  }

  async _delete(_: string, name: string): Promise<boolean> {
    if (await this.alreadyExists(_, name)) {
      this.animes = this.animes.filter((anime) => anime.name !== name);
      return true;
    }
    return false;
  }

  async alreadyExists(_: string, name: string): Promise<boolean> {
    for (let anime of this.animes) if (anime.name === name) return true;
    return false;
  }
  async getAllSorted(
    _: string,
    limit: string,
    ___: string,
    ____: string[]
  ): Promise<Array<Anime>> {
    let animes: Anime[] = this.animes.sort(SortArray);

    if (Number(limit) && Number(limit) > 0) {
      animes = this.animes.slice(0, Number(limit));
    }

    return animes;
  }
  async getOne(_: string, name: string, __: string[]): Promise<Anime | null> {
    const anime = this.animes.filter((anime) => anime.name === name);
    if (anime.length > 0) {
      return anime[0];
    }
    return null;
  }
  async getRandom(
    _: string,
    limit: string,
    __: string[]
  ): Promise<Array<Anime>> {
    const animes: Anime[] = [];
    const numbers: Array<number> = [];
    const Nlimit = Number(limit);
    let i = 0;
    while (i < Nlimit) {
      const number = Math.floor(Math.random() * Nlimit);
      if (!numbers.includes(number)) {
        numbers.push(number);
        animes.push(this.animes[number]);
        i++;
      }
      if (i === Nlimit) break;
    }
    return animes;
  }

  async insert(_: string, __: string[], data: Anime): Promise<boolean> {
    if (await this.alreadyExists(_, data.name)) return false;
    this.animes.push(data);
    return true;
  }
  async update(_: string, name: string, newData: Anime): Promise<boolean> {
    if (
      !(await this.alreadyExists(_, name)) ||
      ((await this.alreadyExists(_, newData.name)) && newData.name !== name)
    )
      return false;
    let index = 0;
    for (let anime of this.animes)
      if (anime.name === name) index = this.animes.indexOf(anime);
    this.animes[index].comment = newData.comment;
    this.animes[index].folder = newData.folder;
    this.animes[index].images = newData.images;
    this.animes[index].info = newData.info;
    this.animes[index].musics = newData.musics;
    this.animes[index].name = newData.name;
    this.animes[index].photo = newData.photo;
    this.animes[index].synopsis = newData.synopsis;
    this.animes[index].whereWatch = newData.whereWatch;
    return true;
  }
}