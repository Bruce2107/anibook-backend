import { Card as ICard } from 'anibook';

/**
 * @property `string` folder
 * @property `string` name
 * @property `string` photo
 */
export class Card implements ICard {
  folder?: string;
  name: string;
  photo: string;

  constructor({ ...props }: Card) {
    Object.assign(this, props);
  }
}
