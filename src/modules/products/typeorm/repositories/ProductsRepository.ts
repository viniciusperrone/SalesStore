import { dataSource } from '@shared/typeorm';
import Product from '../entities/Product';

export const ProductsRepository = dataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  },
  
});
