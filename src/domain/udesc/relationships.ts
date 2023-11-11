export class UserStatus {
  type: string;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
