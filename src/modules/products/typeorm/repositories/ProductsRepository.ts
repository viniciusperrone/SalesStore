import { dataSource } from '@shared/typeorm';
import { In } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  uuid: string;
}

const ProductsRepository = dataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  },
  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.uuid);

    const existsProducts = await this.find({
      where: {
        uuid: In(productsIds),
      },
    });

    return existsProducts;
  },
});
export { ProductsRepository };
