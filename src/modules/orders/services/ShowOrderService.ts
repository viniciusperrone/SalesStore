import AppError from '@shared/errors/AppError';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import Order from '../typeorm/entities/Order';

interface IRequest {
  uuid: string;
}

class ShowOrderService {
  public async execute({ uuid }: IRequest): Promise<Order> {
    const ordersRepository = OrdersRepository;

    const order = await ordersRepository.findById(uuid);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
