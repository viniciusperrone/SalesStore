import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  uuid: string;
}

class ShowProductService {
  public async execute({ uuid }: IRequest): Promise<Product | null> {
    const productsRepository = ProductsRepository;

    const product = await productsRepository.findOne({ where: { uuid } });

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
