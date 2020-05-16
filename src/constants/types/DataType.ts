export interface Data {
  folder: string;
  name: string;
  photo_path: string;
  images_paths: Array<string>;
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

export type Card = Pick<Data, 'folder' | 'name' | 'photo_path'>
