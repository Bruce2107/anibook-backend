export type AvailableStatus =
  | 'watched'
  | 'watching'
  | 'dropped'
  | 'plan_to_watch';

export class UserStatus {
  type: AvailableStatus;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
