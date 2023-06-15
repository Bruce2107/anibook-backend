export class Streaming {
  name: string;
  link: string;
  language?: string[];

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
