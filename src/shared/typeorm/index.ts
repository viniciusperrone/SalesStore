import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

import {
  CreateProducts,
  CreateUsers,
  CreateUserTokens,
  CreateCustomers,
  CreateOrders,
  AddCustomerIdToOrders,
  CreateOrdersProducts,
  AddOrderIdToOrdersProducts,
  AddProductsIdToOrdersProducts,
} from './migrations';
import Product from '@modules/products/typeorm/entities/Product';
import User from '@modules/users/typeorm/entities/User';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import Customer from '@modules/customers/typeorm/entities/Customer';
import Order from '@modules/orders/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/typeorm/entities/OrdersProducts';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [Product, User, UserToken, Customer, Order, OrdersProducts],
  migrations: [
    CreateProducts,
    CreateUsers,
    CreateUserTokens,
    CreateCustomers,
    CreateOrders,
    AddCustomerIdToOrders,
    CreateOrdersProducts,
    AddOrderIdToOrdersProducts,
    AddProductsIdToOrdersProducts,
  ],
});
