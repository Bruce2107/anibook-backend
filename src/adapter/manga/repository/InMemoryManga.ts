import MangaRepository from '@usecase/port/AnimeMangaRepository';
import Manga from '@domain/manga';
import SortArray from '@utils/SortArray';

export default class InMemoryMangaReposiory implements MangaRepository<Manga> {
  mangas: Manga[] = [];
  constructor(mangas: Manga[]) {
    this.mangas = mangas;
  }

  async _delete(name: string): Promise<boolean> {
    if (await this.alreadyExists(name)) {
      this.mangas = this.mangas.filter((manga) => manga.name !== name);
      return true;
    }
    return false;
  }

  async alreadyExists(name: string): Promise<boolean> {
    for (let manga of this.mangas) if (manga.name === name) return true;
    return false;
  }

  async getOne(name: string, __: string[]): Promise<Manga | null> {
    const manga = this.mangas.filter((manga) => manga.name === name);
    if (manga.length > 0) {
      return manga[0];
    }
    return null;
  }
  async getAllSorted(
    limit: string,
    ___: string,
    ____: string[]
  ): Promise<Array<Manga>> {
    let mangas: Manga[] = this.mangas.sort(SortArray);

    if (Number(limit) && Number(limit) > 0) {
      mangas = this.mangas.slice(0, Number(limit));
    }

    return mangas;
  }
  async getRandom(limit: string, __: string[]): Promise<Array<Manga>> {
    if (!limit) {
      return this.mangas;
    }
    const mangas: Manga[] = [];
    const numbers: Array<number> = [];
    const Nlimit = Number(limit);
    let i = 0;
    while (i < Nlimit) {
      const number = Math.floor(Math.random() * Nlimit);
      /* istanbul ignore else */
      if (!numbers.includes(number)) {
        numbers.push(number);
        mangas.push(this.mangas[number]);
        i++;
      }
      if (i === Nlimit) break;
    }
    return mangas;
  }

  async insert(__: string[], data: Manga): Promise<boolean> {
    if (await this.alreadyExists(data.name)) return false;
    this.mangas.push(data);
    return true;
  }
  async update(name: string, newData: Manga): Promise<boolean> {
    if (
      !(await this.alreadyExists(name)) ||
      ((await this.alreadyExists(newData.name)) && newData.name !== name)
    )
      return false;
    let index = 0;
    for (let manga of this.mangas)
      if (manga.name === name) index = this.mangas.indexOf(manga);
    this.mangas[index].comment = newData.comment;
    this.mangas[index].folder = newData.folder;
    this.mangas[index].images = newData.images;
    this.mangas[index].info = newData.info;
    this.mangas[index].name = newData.name;
    this.mangas[index].photo = newData.photo;
    this.mangas[index].synopsis = newData.synopsis;
    this.mangas[index].whereRead = newData.whereRead;
    return true;
  }
}
