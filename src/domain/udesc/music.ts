export class Studio {
  name: string;
  link: string;
  idLanguage: number;
  idSerie: number;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
