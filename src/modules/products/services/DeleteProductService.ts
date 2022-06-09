import { RedisCache } from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  uuid: string;
}

class DeleteProductService {
  public async execute({ uuid }: IRequest): Promise<void> {
    const productRepository = ProductsRepository;

    const redisCache = new RedisCache();

    const product = await productRepository.findOne({ where: { uuid } });

    if (!product) {
      throw new AppError('Product not found');
    }

    await redisCache.invalidate('api-sales-PRODUCT_LIST');

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
