import { Integer, Node } from 'neo4j-driver';
import { Music } from './music';
import { Author } from './author';
import { Status } from './status';
import { Streaming } from './streaming';
import { Studio } from './studio';
import { Image } from '@domain/image';

export class Serie {
  name: string;
  synopsis: string;
  comment: string;
  numberOfEpisodes: number;
  createdAt?: Date;
  updateAt?: Date;
  idStudio: number | string;
  cover: number | string;
  status: number | string;
  authors?: string[];
  streaming?: string[];
  gallery?: string[];

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}

export type SerieNeo4j = {
  s: Node<Integer, Serie>;
  m: Node<Integer, Music>[];
  i: Node<Integer, Image>;
  st: Node<Integer, Status>;
  std: Node<Integer, Studio>;
  a: Node<Integer, Author>[];
  str: Node<Integer, Streaming>[];
};
