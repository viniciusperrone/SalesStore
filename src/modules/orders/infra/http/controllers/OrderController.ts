import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateOrderService } from '@modules/orders/services/CreateOrderService';
import { ShowOrderService } from '@modules/orders/services/ShowOrderService';
import { IShowOrder } from '@modules/orders/domain/models/IShowOrder';

class OrderController {
  public async show(
    request: Request<IShowOrder>,
    response: Response,
  ): Promise<Response> {
    const { uuid } = request.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ uuid });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({ customer_id, products });

    return response.json(order);
  }
}

export { OrderController };
