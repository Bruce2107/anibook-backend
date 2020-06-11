import MangaRepository from '../../../usecase/port/AnimeMangaRepository';
import Manga from '../../../domain/manga';

export default class InMemoryMangaReposiory implements MangaRepository<Manga> {
  mangas: Manga[] = [];
  constructor(mangas: Manga[]) {
    this.mangas = mangas;
  }

  async _delete(_: string, name: string): Promise<boolean> {
    if (await this.alreadyExists(_, name)) {
      this.mangas = this.mangas.filter((manga) => manga.name !== name);
      return true;
    }
    return false;
  }

  async alreadyExists(_: string, name: string): Promise<boolean> {
    for (let manga of this.mangas) if (manga.name === name) return true;
    return false;
  }

  async getOne(_: string, name: string, __: string[]): Promise<Manga | null> {
    const manga = this.mangas.filter((manga) => manga.name === name);
    if (manga.length > 0) {
      return manga[0];
    }
    return null;
  }
  async getRandom(
    _: string,
    limit: string,
    __: string[]
  ): Promise<Array<Manga>> {
    const mangas: Manga[] = [];
    const numbers: Array<number> = [];
    const Nlimit = Number(limit)
    let i = 0;
    while (i < Nlimit) {
      const number = Math.floor(Math.random() * Nlimit);
      if (!numbers.includes(number)) {
        numbers.push(number);
        mangas.push(this.mangas[number]);
        i++;
      }
      if (i === Nlimit) break;
    }
    return mangas;
  }

  async insert(_: string, __: string[], data: Manga): Promise<boolean> {
    if (await this.alreadyExists(_, data.name)) return false;
    this.mangas.push(data);
    return true;
  }
  async update(_: string, name: string, newData: Manga): Promise<boolean> {
    if (
      !(await this.alreadyExists(_, name)) ||
      ((await this.alreadyExists(_, newData.name)) && newData.name !== name)
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
