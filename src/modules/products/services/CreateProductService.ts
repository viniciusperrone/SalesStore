import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = ProductsRepository;
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name!');
    }

    const product = await productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
