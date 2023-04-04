export class Studio {
  name: string;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
