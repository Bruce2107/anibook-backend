import { Card as ICard } from 'anibook';

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
