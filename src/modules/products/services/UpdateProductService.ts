import { RedisCache } from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  uuid: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    uuid,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = ProductsRepository;

    const redisCache = new RedisCache();

    const product = await productRepository.findOne({ where: { uuid } });

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExist = await productRepository.findByName(name);

    if (productExist && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-sales-PRODUCT_LIST');

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
