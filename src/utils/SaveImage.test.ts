import { saveImage } from './SaveImage';
import { InMemoryImageRepository } from '../adapter/image/repository/InMemoryImage';
import { TypeImage } from 'anibook';
import { readFileSync } from 'fs';
import { Readable } from 'stream';

describe('Save Image', () => {
  let images: TypeImage[];
  let imageAdapter: InMemoryImageRepository;
  beforeEach(() => {
    images = [];
    images.push(
      {
        contentType: 'image/jpg',
        folder: 'background',
        image: Buffer.from(
          readFileSync('src/utils/image_test/oono.jpg').toString('base64'),
          'base64'
        ),
        name: 'oono.webp',
      },
      {
        contentType: 'image/webpi',
        folder: 'yuruyuri',
        image: Buffer.from(
          readFileSync('src/utils/image_test/oono.jpg').toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato.webp',
      },
      {
        contentType: 'image/webp',
        folder: 'yuruyuri2',
        image: Buffer.from(
          readFileSync('src/utils/image_test/oono.jpg').toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato.webp',
      }
    );
    imageAdapter = new InMemoryImageRepository(images);
  });

  test('should save one image', async () => {
    const image = {
      buffer: Buffer.from(
        readFileSync('src/utils/image_test/oono.jpg').toString('base64'),
        'base64'
      ),
      destination: '',
      encoding: '',
      fieldname: '',
      filename: 'oono.jpg',
      mimetype: 'image/jpg',
      originalname: 'oono.jpg',
      path: 'src/utils/image_test/oono.jpg',
      size: 122,
      stream: new Readable(),
    };
    const result = await saveImage('folder', imageAdapter, image, undefined);

    expect(result).toBe(true);
  });

  test('should not save when already exists', async () => {
    const image = {
      buffer: Buffer.from(
        readFileSync('src/utils/image_test/oono.jpg').toString('base64'),
        'base64'
      ),
      destination: '',
      encoding: '',
      fieldname: '',
      filename: 'oono.jpg',
      mimetype: 'image/jpg',
      originalname: 'oono.jpg',
      path: 'src/utils/image_test/oono.jpg',
      size: 122,
      stream: new Readable(),
    };
    const result = await saveImage(
      'background',
      imageAdapter,
      image,
      undefined
    );

    expect(result).toBe(false);
  });

  test('should insert 2 images', async () => {
    const image = [
      {
        buffer: Buffer.from(
          readFileSync('src/utils/image_test/oono.jpg').toString('base64'),
          'base64'
        ),
        destination: '',
        encoding: '',
        fieldname: '',
        filename: 'oono.jpg',
        mimetype: 'image/jpg',
        originalname: 'oono.jpg',
        path: 'src/utils/image_test/oono.jpg',
        size: 122,
        stream: new Readable(),
      },
      {
        buffer: Buffer.from(
          readFileSync('src/utils/image_test/KarenKujou.gif').toString(
            'base64'
          ),
          'base64'
        ),
        destination: '',
        encoding: '',
        fieldname: '',
        filename: 'oono.jpg',
        mimetype: 'image/gif',
        originalname: 'KarenKujou.gif',
        path: 'src/utils/image_test/KarenKujou.gif',
        size: 122,
        stream: new Readable(),
      },
      {
        buffer: Buffer.from(
          readFileSync('src/utils/image_test/oono.jpg').toString('base64'),
          'base64'
        ),
        destination: '',
        encoding: '',
        fieldname: '',
        filename: 'oono.jpg',
        mimetype: 'image/jpg',
        originalname: 'oono2.jpg',
        path: 'src/utils/image_test/oono.jpg',
        size: 122,
        stream: new Readable(),
      },
    ];

    const result = await saveImage(
      'background',
      imageAdapter,
      undefined,
      image
    );

    expect(result).toBe(true);
    expect(images.length).toBe(5);
  });
});
