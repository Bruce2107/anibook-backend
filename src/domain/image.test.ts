import { TypeImage } from 'anibook';
import Image from './image';
import fs from 'fs';
describe('Image', () => {
  test('should create an image', () => {
    const object: TypeImage = {
      contentType: 'image/webp',
      folder: 'background',
      name: 'ToshinoKyokoTomato.webp',
      image: Buffer.from(
        fs.readFileSync('src/domain/ToshinoKyokoTomato.webp').toString('base64'),
        'base64'
      ),
    };
    const i = new Image(object);

    expect(i.contentType).toBe('image/webp');
    expect(i.image).toBeDefined();
  });
});
