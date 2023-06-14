import { Studio } from '@domain/udesc/studio';
import { StudioRepository } from './StudioRepository';
import { neo4j_driver } from 'src/database';
import { Integer, Node } from 'neo4j-driver';

export class StudioRepositoryGraphImpl implements StudioRepository {
  async _delete(name: string): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeWrite((tx) =>
        tx.run(`MATCH (s: Studio {name: '${name}'}) DETACH DELETE s`)
      );
      return !!res.summary.counters.updates().nodesDeleted;
    } finally {
      session.close();
    }
  }
  async insertOne(studio: Studio): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      if (await this.alreadyExists(studio)) {
        return false;
      }
      const res = await session.executeWrite((tx) =>
        tx.run(`CREATE (a: Studio {name: '${studio.name}'})`)
      );
      let result = res.summary.counters.updates().nodesCreated;
      return !!result;
    } finally {
      session.close();
    }
  }
  async updateStudio(name: string, studio: Studio): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeWrite((tx) =>
        tx.run(
          `MATCH (s: Studio {name: '${name}'}) SET s.name = '${studio.name}'`
        )
      );
      return !!res.summary.counters.updates().propertiesSet;
    } finally {
      session.close();
    }
  }
  async getStudio(name: string): Promise<Studio[]> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ s: Node<Integer, Studio> }>(
          `MATCH (s:Studio) WHERE s.name contains '${name}' RETURN s`
        )
      );
      const studios = res.records.map((record) => record.get('s').properties);
      return studios;
    } finally {
      session.close();
    }
  }
  getStudioById(_: string): Promise<Studio> {
    throw new Error('Method not implemented.');
  }
  async alreadyExists(studio: Studio): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ s: Node<Integer, Studio> }>(
          `MATCH (s: Studio) WHERE s.name = '${studio.name}' RETURN s`
        )
      );
      return !!res.records.length;
    } finally {
      session.close();
    }
  }
  async getAllStudios(): Promise<Studio[]> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ s: Node<Integer, Studio> }>(
          `MATCH (s:Studio) RETURN s ORDER BY s.name`
        )
      );
      const studios = res.records.map((record) => record.get('s').properties);
      return studios;
    } finally {
      session.close();
    }
  }
}
