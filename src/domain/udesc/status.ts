export class Status {
  value: string;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
