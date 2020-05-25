import { Pool } from 'pg';
import dotenv from 'dotenv';
import mongo from 'mongodb';

dotenv.config();

export const pool = new Pool({
  user: (process.env.DB_USER_POSTGRES as string) || 'eduhenriquezup',
  host: (process.env.DB_HOST_POSTGRES as string) || 'localhost',
  password: (process.env.DB_PASS_POSTGRES as string) || 'anibook',
  database: (process.env.DB_NAME_POSTGRES as string) || 'anibook',
  port: Number(process.env.DB_PORT_POSTGRES) | 5432,
});

export const mongoConnection = async (database: string) => {
  const url =
    (process.env.DB_URL_MONGO as string) ||
    'mongodb://anibook:anibook@localhost:27017';
  const mongoClient = mongo.MongoClient;
  return mongoClient
    .connect(url, { useUnifiedTopology: true })
    .then((connetion) => connetion.db(database));
};
