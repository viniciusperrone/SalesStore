import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

import { CreateProducts } from './migrations';
import Product from '@modules/products/typeorm/entities/Product';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [Product],
  migrations: [CreateProducts],
});
