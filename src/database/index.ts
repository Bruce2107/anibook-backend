import { Pool } from 'pg';
import dotenv from 'dotenv';
import mongo from 'mongodb';

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER_POSTGRES as string | 'eduhenriquezup',
  host: process.env.DB_HOST_POSTGRES as string | 'localhost',
  password: process.env.DB_PASS_POSTGRES as string | 'anibook',
  database: process.env.DB_NAME_POSTGRES as string | 'anibook',
  port: Number(process.env.DB_PORT_POSTGRES) | 5432,
});

export const mongoConnection = async (database: string) => {
  const user = process.env.DB_USER_MONGO as string | 'anibook';
  const pass = process.env.DB_PASS_MONGO as string | 'anibook';
  const host = process.env.DB_HOST_MONGO as string | 'localhost';
  const port = Number(process.env.DB_PORT_MONGO) | 27017;

  const url = `mongodb://${user}:${pass}@${host}:${port}`;
  const mongoClient = mongo.MongoClient;
  return mongoClient
    .connect(url, { useUnifiedTopology: true })
    .then((connetion) => connetion.db(database));
};
