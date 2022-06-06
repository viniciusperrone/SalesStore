import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

import { CreateProducts, CreateUsers } from './migrations';
import Product from '@modules/products/typeorm/entities/Product';
import User from '@modules/users/typeorm/entities/User';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [Product, User],
  migrations: [CreateProducts, CreateUsers],
});
