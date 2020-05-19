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

export type Card = Pick<Data, 'folder' | 'name' | 'photo'>

export type FileMulter = {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  destination: string,
  filename: string,
  path: string,
  size: number
}
