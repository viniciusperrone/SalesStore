import { injectable as Injectable, inject as Inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IRequestCreateOrder } from '../domain/models/IRequestCreateOrder';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IOrder } from '../domain/models/IOrder';

@Injectable()
class CreateOrderService {
  constructor(
    @Inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @Inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @Inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    customer_id,
    products,
  }: IRequestCreateOrder): Promise<IOrder> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await this.productsRepository.findAllByIds(products);

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

    if (quantityAvailable.length) {
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

    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: serializerProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      uuid: product.product_id,
      quantity:
        existsProducts.filter(p => p.uuid === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateStock(updatedProductQuantity);

    return order;
  }
}

export { CreateOrderService };
