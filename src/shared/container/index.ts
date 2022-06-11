import { container } from 'tsyringe';

import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepositories';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepositories';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
