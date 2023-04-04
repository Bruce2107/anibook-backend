export class Streaming {
  name: string;
  link: string;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
