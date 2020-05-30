export interface Data {
  folder: string;
  name: string;
  photo: string;
  images: Array<string>;
  synopsis: string;
  comment: string;
}

export interface Info {
  author: string;
  status: string;
}

export interface Link {
  language: string;
  url: string;
  name: string;
}

export type Card = Pick<Data, 'folder' | 'name' | 'photo'>;

export type GetResponse<T> = {
  status: number;
  data?: T;
  rows?: number;
};

export const CardFields = [
  `dados ->> 'folder' as folder`,
  `dados ->> 'photo' as photo`,
  `dados ->> 'name' as name`,
];
