import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';

import Order from '../entities/Order';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';

class OrdersRepository implements IOrdersRepository {
  private databaseRepository: Repository<Order>;

  constructor() {
    this.databaseRepository = dataSource.getRepository(Order);
  }

  public async findById(uuid: string): Promise<Order | null> {
    const order = await this.databaseRepository.findOne({
      where: { uuid },
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.databaseRepository.create({
      customer,
      order_products: products,
    });

    await this.databaseRepository.save(order);

    return order;
  }
}

export { OrdersRepository };
