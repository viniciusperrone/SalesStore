import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productRepository = ProductRepository;

    const products = await productRepository.find();

    return products;
  }
}

export default ListProductsService;
