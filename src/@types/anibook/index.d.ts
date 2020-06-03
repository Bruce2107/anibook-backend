/// <reference types="typescript" />

declare module 'anibook' {
  // Gerenal

  /**
   * @property comment
   * @property folder
   * @property images
   * @property name
   * @property photo
   * @property synopsis
   */
  export interface Data {
    folder: string;
    name: string;
    photo: string;
    images: Array<string>;
    synopsis: string;
    comment: string;
  }

  /**
   * @property author
   * @property status
   */
  export interface Info {
    author: string;
    status: string;
  }

  /**
   * @property language
   * @property name
   * @property url
   */
  export interface Link {
    language: string;
    url: string;
    name: string;
  }

  // Animes

  /**
   * @property numberEpisodes
   */
  export interface AnimeInfo extends Info {
    numberEpisodes: number;
  }

  /**
   * @property info
   * @property whereWatch
   * @property musics
   */
  export interface Anime extends Data {
    info: AnimeInfo;
    whereWatch: Array<Link>;
    musics: Array<Link>;
  }

  // Manga

  /**
   * @property numberChapeters
   * @property numberVolumes
   */
  export interface MangaInfo extends Info {
    numberChapters: number;
    numberVolumes: number;
  }

  /**
   * @property info
   * @property whereRead
   */
  export interface Manga extends Data {
    info: MangaInfo;
    whereRead: Array<Link>;
  }

  // Card

  /**
   * @property folder
   * @property name
   * @property photo
   */
  export type Card = Pick<Data, 'folder' | 'name' | 'photo'>;

  // Image

  /**
   * @property contentType
   * @property folder
   * @property image
   * @property name
   */
  export type TypeImage = {
    folder: string;
    name: string;
    contentType: string;
    image: Buffer;
  };

  // Token

  /**
   * @property email
   * @property nickname
   */
  export interface User {
    nickname: string;
    email: string;
  }
  
  // Utilits

  /**
   * @template T `Anime` | `Manga` | `Card`
   * @property data
   * @property status
   * @property rows
   */
  export type GetResponse<T> = {
    status: number;
    data?: T;
    rows?: number;
  };

  /**
   * @template T `Anime` | `Manga` | `Card`
   * @property dados
   */
  export type Dados<T> = {
    dados: T;
  };

  /**
   * @param object 
   * @returns true if `object` are an `Anime`
   */
  export function isAnime(object: Anime | Manga): object is Anime {
    return 'whereWatch' in object;
  }

  /**
   * @param object 
   * @returns true if `object` are an `Manga`
   */
  export function isManga(object: Anime | Manga): object is Manga {
    return 'whereRead' in object;
  }
}
