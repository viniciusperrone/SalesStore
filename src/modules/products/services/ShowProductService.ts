import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface IRequest {
  uuid: string;
}

class ShowProductService {
  public async execute({ uuid }: IRequest): Promise<Product | null> {
    const productRepository = ProductRepository;

    const product = await productRepository.findOne({ where: { uuid } });

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
