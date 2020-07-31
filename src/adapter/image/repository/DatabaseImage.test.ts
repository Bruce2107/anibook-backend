import { readFileSync } from 'fs';
import DatabaseImage from './DatabaseImage';
import Image from '../../../domain/image';
describe('Database Image', () => {
  let databaseImage: DatabaseImage;
  beforeEach(() => {
    databaseImage = new DatabaseImage();
  });

  describe('Already exists', () => {
    it('should return true when image already exists', async () => {
      const result = await databaseImage.alreadyExists(
        'background',
        'Aqua.webp'
      );
      expect(result).toBe(true);
    });
    it('should return false when image not found', async () => {
      const result = await databaseImage.alreadyExists(
        'background',
        'NotFound.webp'
      );
      expect(result).toBe(false);
    });
  });

  describe('Get One', () => {
    it('should get an image object', async () => {
      const result = await databaseImage.getOne('background', 'Aqua.webp');
      expect(result.contentType).toBe('image/webp');
    });
    it('should not get an image object', async () => {
      const result = await databaseImage.getOne('background', 'Aqua.web2');
      expect(result).toBeUndefined();
    });
  });

  describe('Get Background', () => {
    it('should get an background', async () => {
      const result = await databaseImage.getBackground();
      expect(result).toBeDefined();
    });
  });

  describe('Insert One', () => {
    it('should insert an image', async () => {
      const image: Image = {
        contentType: 'image/webpy',
        folder: 'background',
        image: Buffer.from(
          readFileSync(
            'src/adapter/image/repository/ToshinoKyokoTomato.webp'
          ).toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato2.webp',
      };
      const result = await databaseImage.insertOne(image);
      expect(result).toBe(true);
    });
    it('should not insert an image', async () => {
      const image: Image = {
        contentType: 'image/webpy',
        folder: 'background',
        image: Buffer.from(
          readFileSync(
            'src/adapter/image/repository/ToshinoKyokoTomato.webp'
          ).toString('base64'),
          'base64'
        ),
        name: 'ToshinoKyokoTomato2.webp',
      };
      const result = await databaseImage.insertOne(image);
      expect(result).toBe(false);
    });
  });
  describe('Insert Many', () => {
    afterAll(async () => {
      await databaseImage._delete('background', 'ToshinoKyokoTomatoMany1.webp');
      await databaseImage._delete('background', 'ToshinoKyokoTomatoMany2.webp');
    });
    it('should insert 2 images', async () => {
      const images: Image[] = [
        {
          contentType: 'image/webpy',
          folder: 'background',
          image: Buffer.from(
            readFileSync(
              'src/adapter/image/repository/ToshinoKyokoTomato.webp'
            ).toString('base64'),
            'base64'
          ),
          name: 'ToshinoKyokoTomatoMany1.webp',
        },
        {
          contentType: 'image/webpi',
          folder: 'background',
          image: Buffer.from(
            readFileSync(
              'src/adapter/image/repository/ToshinoKyokoTomato.webp'
            ).toString('base64'),
            'base64'
          ),
          name: 'ToshinoKyokoTomatoMany2.webp',
        },
      ];
      const result = await databaseImage.insertMany(images);
      expect(result[0]).toBe(true);
      expect(result[1]).toBe(2);
    });
  });

  describe('Delete One', () => {
    it('should delete an image', async () => {
      const result = await databaseImage._delete(
        'background',
        'ToshinoKyokoTomato2.webp'
      );
      expect(result).toBe(true);
    });
    it('should not delete an image', async () => {
      const result = await databaseImage._delete(
        'background',
        'ToshinoKyokoTomato2.webp'
      );
      expect(result).toBe(false);
    });
  });
});
