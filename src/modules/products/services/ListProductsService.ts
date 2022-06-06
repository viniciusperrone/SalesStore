import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productRepository = ProductsRepository;

    const products = await productRepository.find();

    return products;
  }
}

export default ListProductsService;
