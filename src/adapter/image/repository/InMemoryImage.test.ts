import fs from 'fs';
import InMemoryImage from './InMemoryImage';
import Image from '../../../domain/image';
describe('InMemoryImage', () => {
  let images: Image[] = [];
  let inMemoryImage: InMemoryImage;
  beforeEach(() => {
    images = [];
    images.push(
      {
        contentType: 'image/webpy',
        folder: 'background',
        image: Buffer.from(
          fs
            .readFileSync(
              'src/adapter/image/repository/ToshinoKyokoTomato.webp'
            )
            .toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato.webp',
      },
      {
        contentType: 'image/webpi',
        folder: 'yuruyuri',
        image: Buffer.from(
          fs
            .readFileSync(
              'src/adapter/image/repository/ToshinoKyokoTomato.webp'
            )
            .toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato.webp',
      },
      {
        contentType: 'image/webp',
        folder: 'yuruyuri2',
        image: Buffer.from(
          fs
            .readFileSync(
              'src/adapter/image/repository/ToshinoKyokoTomato.webp'
            )
            .toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato.webp',
      }
    );
    inMemoryImage = new InMemoryImage(images);
  });
  test('should return true when already exist an image', async () => {
    const result = await inMemoryImage.alreadyExists(
      'background',
      'ToshinoKyokoTomato.webp'
    );
    expect(result).toBeTruthy();
  });
  test('should return false when are a new image', async () => {
    const result = await inMemoryImage.alreadyExists(
      'backgroundi',
      'ToshinoKyokoTomato.webp'
    );
    expect(result).toBeFalsy();
  });
  test('should delete an image', async () => {
    const result = await inMemoryImage._delete(
      'yuruyuri2',
      'ToshinoKyokoTomato.webp'
    );
    expect(result).toBeTruthy();
  });
  test('should get an background image', async () => {
    const result = await inMemoryImage.getBackground();
    expect(result.contentType).toBe('image/webpy');
  });
  test('should get an image', async () => {
    const result = (await inMemoryImage.getOne(
      'yuruyuri',
      'ToshinoKyokoTomato.webp'
    )) as Pick<Image, 'contentType' | 'image'>;
    expect(result.contentType).toBe('image/webpi');
  });
  test('should not get an image', async () => {
    const result = await inMemoryImage.getOne(
      'yuruyuri1',
      'ToshinoKyokoTomato.webp'
    );
    expect(result).toBe(null);
  });
  test('should insert n images', async () => {
    const images: Image[] = [
      {
        contentType: 'image/webpy',
        folder: 'background',
        image: Buffer.from(
          fs
            .readFileSync(
              'src/adapter/image/repository/ToshinoKyokoTomato.webp'
            )
            .toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato2.webp',
      },
      {
        contentType: 'image/webpi',
        folder: 'yuruyuri',
        image: Buffer.from(
          fs
            .readFileSync(
              'src/adapter/image/repository/ToshinoKyokoTomato.webp'
            )
            .toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato2.webp',
      },
      {
        contentType: 'image/webp',
        folder: 'yuruyuri2',
        image: Buffer.from(
          fs
            .readFileSync(
              'src/adapter/image/repository/ToshinoKyokoTomato.webp'
            )
            .toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato.webp',
      },
    ];
    const result = await inMemoryImage.insertMany(images);
    expect(result[0]).toBeTruthy();
  });
  test('should insert one image', async () => {
    const image: Image = {
      contentType: 'image/webpy',
      folder: 'background',
      image: Buffer.from(
        fs
          .readFileSync('src/adapter/image/repository/ToshinoKyokoTomato.webp')
          .toString('base64'),
        'base64'
      ),
      name: 'ToshinoKyokoTomato2.webp',
    };
    const result = await inMemoryImage.insertOne(image);
    expect(result).toBe(true);
  });
  test('should not insert one image', async () => {
    const image: Image = {
      contentType: 'image/webpy',
      folder: 'background',
      image: Buffer.from(
        fs
          .readFileSync('src/adapter/image/repository/ToshinoKyokoTomato.webp')
          .toString('base64'),
        'base64'
      ),
      name: 'ToshinoKyokoTomato.webp',
    };
    const result = await inMemoryImage.insertOne(image);
    expect(result).toBe(false);
  });
});
