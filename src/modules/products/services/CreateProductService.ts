import { injectable as Injectable, inject as Inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { RedisCache } from '@shared/cache/RedisCache';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';
import { ICreateProduct } from '../domain/models/ICreateProduct';

@Injectable()
class CreateProductService {
  constructor(
    @Inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(name);

    const redisCache = new RedisCache();

    if (productExists) {
      throw new AppError('There is already one product with this name!');
    }

    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-sales-PRODUCT_LIST');

    await this.productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
