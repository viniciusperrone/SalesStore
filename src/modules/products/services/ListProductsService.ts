import { injectable as Injectable, inject as Inject } from 'tsyringe';
import { RedisCache } from '@shared/cache/RedisCache';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';

@Injectable()
class ListProductsService {
  constructor(
    @Inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<IProduct[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<IProduct[]>(
      'api-sales-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productsRepository.findAll();

      await redisCache.save('api-sales-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductsService;
