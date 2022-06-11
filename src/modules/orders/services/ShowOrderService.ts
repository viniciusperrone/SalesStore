import { injectable as Injectable, inject as Inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IOrder } from '../domain/models/IOrder';
import { IShowOrder } from '../domain/models/IShowOrder';

@Injectable()
class ShowOrderService {
  constructor(
    @Inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}
  public async execute({ uuid }: IShowOrder): Promise<IOrder> {
    const order = await this.ordersRepository.findById(uuid);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export { ShowOrderService };
