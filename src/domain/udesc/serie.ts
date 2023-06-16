export class Serie {
  name: string;
  synopsis: string;
  comment: string;
  numberOfEpisodes: number;
  createdAt?: Date;
  updateAt?: Date;
  idStudio: number | string;
  cover: number | string;
  status: number | string;
  authors?: string[];
  streaming?: string[];
  gallery?: string[];

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
