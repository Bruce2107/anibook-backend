import { Image } from '@domain/image';
import { neo4j_driver } from 'src/database';
import { Integer, Node } from 'neo4j-driver';
import { ImageRelationalRepository } from './ImageRelationalRepository';

export class ImageRepositoryGraphImpl implements ImageRelationalRepository {
  updateImage(__: string, _: Image): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async alreadyExists(folder: string, name: string): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        'MATCH (i:Image {folder: $folder, name: $name}) RETURN i',
        { folder, name }
      );
      return result.records.length > 0;
    } finally {
      session.close();
    }
  }
  __delete(_: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  getById(_: string): Promise<Image> {
    throw new Error('Method not implemented.');
  }
  async _delete(folder: string, name: string): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        'MATCH (i:Image {folder: $folder, name: $name}) DETACH DELETE i',
        { folder, name }
      );
      return !!result.summary.counters.updates().nodesDeleted;
    } finally {
      session.close();
    }
  }
  async getOne(
    folder: string,
    name: string
  ): Promise<Pick<Image, 'contentType' | 'image'> | null> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        'MATCH (i:Image {folder: $folder, name: $name}) RETURN i',
        {
          folder,
          name,
        }
      );
      if (result.records.length > 0) {
        return result.records[0].get('i').properties;
      }
      return null;
    } finally {
      session.close();
    }
  }
  async getBackground(): Promise<Pick<Image, 'contentType' | 'image'>> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run<{
        i: Node<Integer, Pick<Image, 'contentType' | 'image'>>;
      }>('MATCH (i:Image {folder: $folder}) RETURN i ORDER BY rand() LIMIT 1', {
        folder: 'background',
      });
      return result.records[0]?.get('i').properties;
    } finally {
      session.close();
    }
  }
  async insertMany(images: Image[]): Promise<[boolean, number]> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        'UNWIND $images AS image CREATE (i:Image {folder: image.folder, name: image.name, contentType: image.contentType, image: image.image})',
        { images }
      );
      return [
        !!result.summary.counters.updates().nodesCreated,
        result.summary.counters.updates().nodesCreated,
      ];
    } finally {
      session.close();
    }
  }
  async insertOne(image: Image): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      if (await this.alreadyExists(image.folder, image.name)) {
        return false;
      }
      const result = await session.run(
        'CREATE (i:Image {folder: $folder, name: $name, link: $link})',
        image
      );
      return !!result.summary.counters.updates().nodesCreated;
    } finally {
      session.close();
    }
  }
}
