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

export type GetResponse<T> = {
  status: number;
  data?: T;
  rows?: number;
};

export type Dados<T> = {
  dados: T;
};
