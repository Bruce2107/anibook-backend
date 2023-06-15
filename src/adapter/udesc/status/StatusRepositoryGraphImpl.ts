import { Status } from '@domain/udesc/status';
import { StatusRepository } from './StatusRepository';
import { neo4j_driver } from 'src/database';
import { Integer, Node } from 'neo4j-driver';

export class StatusRepositoryGraphImpl implements StatusRepository {
  async _delete(id: string): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        `MATCH (s:Status {value: $id}) DETACH DELETE s`,
        { id }
      );
      return !!result.summary.counters.updates().nodesDeleted;
    } finally {
      session.close();
    }
  }
  async insertOne(status: Status): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      if (await this.alreadyExists(status)) {
        return false;
      }
      const result = await session.run(
        `CREATE (s:Status {value: '${status.value}'}) RETURN s`
      );
      return !!result.records.length;
    } finally {
      session.close();
    }
  }
  async updateStatus(id: string, status: Status): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        `MATCH (s:Status {value: $id})
        SET s.value = $value
        RETURN s;`,
        {
          id,
          value: status.value,
        }
      );
      return !!result.records.length;
    } finally {
      session.close();
    }
  }
  async getStatus(name: string): Promise<Status[]> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run<{ s: Node<Integer, Status> }>(
        `MATCH (s:Status) WHERE s.value =~ '(?i).*${name}.*' RETURN s`,
        { name }
      );
      return result.records.map((record) => record.get('s').properties);
    } finally {
      session.close();
    }
  }
  async getStatusById(_: string): Promise<Status> {
    throw new Error('Method not implemented.');
  }
  async alreadyExists(status: Status): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        `MATCH (s:Status {value: $name}) RETURN s`,
        { name: status.value }
      );
      return !!result.records.length;
    } finally {
      session.close();
    }
  }
  async getAllStatus(): Promise<Status[]> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run<{ s: Node<Integer, Status> }>(
        `MATCH (s:Status) RETURN s ORDER BY s.value`
      );
      return result.records.map((record) => record.get('s').properties);
    } finally {
      session.close();
    }
  }
}
