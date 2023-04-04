export class Author {
  name: string;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
