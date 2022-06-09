import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import { RedisCache } from '@shared/cache/RedisCache';

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productRepository = ProductsRepository;

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-sales-PRODUCT_LIST',
    );

    if (!products) {
      products = await productRepository.find();

      await redisCache.save('api-sales-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductsService;
