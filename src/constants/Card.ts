import { Data } from "./Data";

export type Card = Pick<Data, 'folder' | 'name' | 'photo'>;

export const CardFields = [
  `dados ->> 'folder' as folder`,
  `dados ->> 'photo' as photo`,
  `dados ->> 'name' as name`,
];
