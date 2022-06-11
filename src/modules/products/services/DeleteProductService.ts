import { injectable as Injectable, inject as Inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { RedisCache } from '@shared/cache/RedisCache';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';

@Injectable()
class DeleteProductService {
  constructor(
    @Inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ uuid }: IDeleteProduct): Promise<void> {
    const redisCache = new RedisCache();

    const product = await this.productsRepository.findById(uuid);

    if (!product) {
      throw new AppError('Product not found');
    }

    await redisCache.invalidate('api-sales-PRODUCT_LIST');

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
