import { Card as ICard } from 'anibook';

/**
 * @property `string` folder
 * @property `string` name
 * @property `string` photo
 */
export default class Card implements ICard {
  folder: string;
  name: string;
  photo: string;
  
  constructor({ folder, name, photo }: ICard) {
    this.folder = folder as string;
    this.name = name;
    this.photo = photo;
  }
}
