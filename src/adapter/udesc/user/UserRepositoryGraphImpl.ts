import { User } from '@domain/udesc/user';
import { UserRepository } from './UserRepository';
import { neo4j_driver } from 'src/database';
import { Integer, Node } from 'neo4j-driver';

export class UserRepositoryGraphImpl implements UserRepository {
  async changeStatus(
    name: string,
    serie: string,
    value: string
  ): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      if (!(await this.alreadyExists(name))) {
        return false;
      }
      const query = `MATCH (u:User {name: '${name}'})-[r:USER_STATUS]->(s:Serie {name: '${serie}'})
          SET r.type = '${value}'
          RETURN r;`;

      const res = await session.executeWrite((tx) => tx.run(query));
      return !!res.summary.counters.updates().propertiesSet;
    } finally {
      session.close();
    }
  }
  async _delete(name: string): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeWrite((tx) =>
        tx.run(`MATCH (a: User {name: '${name}'}) DETACH DELETE a`)
      );
      return !!res.summary.counters.updates().nodesDeleted;
    } finally {
      session.close();
    }
  }
  async insertOne(user: User): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      if (await this.alreadyExists(user.name)) {
        return false;
      }
      const res = await session.executeWrite((tx) =>
        tx.run(
          `CREATE (a: User {name: '${user.name}', email:'${user.email}', password: '${user.password}'})`
        )
      );
      let result = res.summary.counters.updates().nodesCreated;
      return !!result;
    } finally {
      session.close();
    }
  }
  async updateUser(name: string, data: User): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeWrite((tx) =>
        tx.run(
          `MATCH (a: User {name: '${name}'}) SET a.name = '${data.name}', a.email = '${data.email}', a.password = '${data.password}'`
        )
      );
      return !!res.summary.counters.updates().propertiesSet;
    } finally {
      session.close();
    }
  }
  async getUser(name: string): Promise<User[]> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ a: Node<Integer, User> }>(
          `MATCH (a:User) WHERE a.name contains '${name}' RETURN a`
        )
      );
      const authors = res.records.map((record) => record.get('a').properties);
      return authors;
    } finally {
      session.close();
    }
  }
  getUserById(_: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async alreadyExists(name: string): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ a: Node<Integer, User> }>(
          `MATCH (a:User) WHERE a.name = '${name}' RETURN a`
        )
      );
      return !!res.records.length;
    } finally {
      session.close();
    }
  }
  async getAllUsers(): Promise<User[]> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ a: Node<Integer, User> }>(
          `MATCH (a:User) RETURN a ORDER BY a.name`
        )
      );
      const authors = res.records.map((record) => record.get('a').properties);
      return authors;
    } finally {
      session.close();
    }
  }
}
