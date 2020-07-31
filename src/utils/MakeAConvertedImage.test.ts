import { readFileSync, unlinkSync } from 'fs';
import { Readable } from 'stream';
import MakeAConvertedImage from './MakeAConvertedImage';

describe('Make a converted image', () => {
  let image: Express.Multer.File;
  beforeAll(() => {
    image = {
      buffer: Buffer.from(
        readFileSync('src/utils/image_test/haruo.png').toString('base64'),
        'base64'
      ),
      destination: '',
      encoding: '',
      fieldname: '',
      filename: 'haruo.png',
      mimetype: 'image/jpg',
      originalname: 'haruo.png',
      path: 'src/utils/image_test/haruo.png',
      size: 122,
      stream: new Readable(),
    };
  });

  afterAll(() => {
    unlinkSync(`${image.path.split('.')[0]}.webp`);
  });

  it('should return a object with webp extension', async () => {
    const result = await MakeAConvertedImage('folder', image);

    expect(result.folder).toBe('folder');
    expect(result.name).toBe('haruo.webp');
  });
});
