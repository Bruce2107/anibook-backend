export class Serie {
  name: string;
  synopsis: string;
  comment: string;
  numberOfEpisodes: number;
  createdAt: Date;
  updateAt: Date;
  idStudio: number;
  cover: number;
  status: number;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
