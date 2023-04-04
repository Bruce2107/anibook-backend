export class Gallery {
  idImage: number;
  idSerie: number;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
