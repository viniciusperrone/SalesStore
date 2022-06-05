import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

import { CreateProducts } from './migrations';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  migrations: [CreateProducts],
});
