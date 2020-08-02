import { Image } from '../../domain/image';

export interface ImageRepository {
  /**
   *
   * @param string `folder` Folder of image
   * @param string `name` Name of image
   */
  alreadyExists(folder: string, name: string): Promise<boolean>;
  /**
   *
   * @param string `folder` Folder of image
   * @param string `name` Name of image
   */
  _delete(folder: string, name: string): Promise<boolean>;
  /**
   *
   * @param string `folder` Folder of image
   * @param string `name` Name of image
   */
  getOne(
    folder: string,
    name: string
  ): Promise<Pick<Image, 'contentType' | 'image'> | null>;
  getBackground(): Promise<Pick<Image, 'contentType' | 'image'>>;
  /**
   *
   * @param Array `images` An array of `Image`
   */
  insertMany(images: Image[]): Promise<[boolean, number]>;
  /**
   *
   * @param Image `image` An object of `Image`
   */
  insertOne(image: Image): Promise<boolean>;
}
