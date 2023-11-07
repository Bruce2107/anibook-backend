export class User {
  name: string;
  email: string;
  password: string;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
