import { dataSource } from '@shared/typeorm';
import Product from '../entities/Product';

const ProductsRepository = dataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  },
});
export { ProductsRepository };
