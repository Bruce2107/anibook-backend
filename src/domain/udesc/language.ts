export class Language {
  language: string;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
