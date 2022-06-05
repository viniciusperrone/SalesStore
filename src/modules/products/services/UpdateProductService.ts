import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface IRequest {
  uuid: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute(data: IRequest): Promise<Product> {
    const { uuid, name, price, quantity } = data;

    const productRepository = ProductRepository;

    const product = await productRepository.findOne({ where: { uuid } });

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExist = await productRepository.findByName(name);

    if (productExist && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
