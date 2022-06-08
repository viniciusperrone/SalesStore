import { Request, Response } from 'express';
import { CreateOrderService } from '../services/CreateOrderService';
import { ShowOrderService } from '../services/ShowOrderService';

class OrderController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params;

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ uuid });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({ customer_id, products });

    return response.json(order);
  }
}

export { OrderController };
