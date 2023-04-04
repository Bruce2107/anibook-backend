export class AuthorSerie {
  idAuthor: number;
  idSerie: number;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
