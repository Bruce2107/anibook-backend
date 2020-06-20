import { readFileSync, unlinkSync } from 'fs';
import { Readable } from 'stream';
import { x2Webp } from './ConverteImage';
import sleep from './Sleep';
describe('Convert Image', () => {
  let image: Express.Multer.File;
  let gif: Express.Multer.File;
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
    gif = {
      buffer: Buffer.from(
        readFileSync('src/utils/image_test/KarenKujou.gif').toString('base64'),
        'base64'
      ),
      destination: '',
      encoding: '',
      fieldname: '',
      filename: 'KarenKujou.gif',
      mimetype: 'image/gif',
      originalname: 'KarenKujou.gif',
      path: 'src/utils/image_test/KarenKujou.gif',
      size: 122,
      stream: new Readable(),
    };
  });

  afterAll(() => {
    unlinkSync(`${image.path.split('.')[0]}.webp`);
    unlinkSync(`${gif.path.split('.')[0]}.webp`);
  });

  it('should convert a jpg image to webp', async () => {
    await x2Webp(image);
    await sleep(200);
    const file = readFileSync(`${image.path.split('.')[0]}.webp`);
    expect(file).toBeDefined();
  });

  it('should convert a gif to webp', async () => {
    await x2Webp(gif);
    await sleep(300);
    const file = readFileSync(`${gif.path.split('.')[0]}.webp`);
    expect(file).toBeDefined();
  });
});
