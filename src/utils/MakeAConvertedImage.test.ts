import { readFileSync, unlinkSync } from 'fs';
import { Readable } from 'stream';
import MakeAConvertedImage from './MakeACovertedImage';

describe('Make a converted image', () => {
  let image: Express.Multer.File;
  beforeAll(() => {
    image = {
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
  });

  afterAll(() => {
    unlinkSync(`${image.path.split('.')[0]}.webp`);
  });

  it('should return a object with wepb extension', async () => {
    const result = await MakeAConvertedImage('folder', image);

    expect(result.folder).toBe('folder');
    expect(result.name).toBe('oono.webp');
  });
});
