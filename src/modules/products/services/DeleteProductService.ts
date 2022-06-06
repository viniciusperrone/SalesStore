import AppError from '@shared/errors/AppError';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  uuid: string;
}

class DeleteProductService {
  public async execute({ uuid }: IRequest): Promise<void> {
    const productRepository = ProductsRepository;

    const product = await productRepository.findOne({ where: { uuid } });

    if (!product) {
      throw new AppError('Product not found');
    }

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
