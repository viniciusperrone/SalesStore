import { injectable as Injectable, inject as Inject } from 'tsyringe';
import { RedisCache } from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';

@Injectable()
class UpdateProductService {
  constructor(
    @Inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({
    uuid,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<IProduct> {
    const redisCache = new RedisCache();

    const product = await this.productsRepository.findById(uuid);

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExist = await this.productsRepository.findByName(name);

    if (productExist && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-sales-PRODUCT_LIST');

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
