export class Music {
  name: string;
  link: string;
  idLanguage: number | string;
  idSerie: number | string;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
