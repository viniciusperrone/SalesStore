import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';

interface IProduct {
  uuid: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = OrdersRepository;
    const customersRepository = CustomersRepository;
    const productsRepository = ProductsRepository;

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(products => products.uuid);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.uuid),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find products ${checkInexistentProducts[0].uuid}.`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(item => item.uuid === product.uuid)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable) {
      throw new AppError(
        `The quantity ${checkInexistentProducts[0].quantity} 
        is not available for ${checkInexistentProducts[0].uuid}.`,
      );
    }

    const serializerProducts = products.map(product => ({
      product_id: product.uuid,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.uuid === product.uuid)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializerProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      uuid: product.product_id,
      quantity:
        existsProducts.filter(p => p.uuid === product.uuid)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
