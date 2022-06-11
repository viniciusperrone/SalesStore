import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { In } from 'typeorm';

import Product from '../entities/Product';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';

class ProductsRepository implements IProductsRepository {
  private databaseRepository: Repository<Product>;

  constructor() {
    this.databaseRepository = dataSource.getRepository(Product);
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = await this.databaseRepository.findOne({ where: { name } });

    return product;
  }

  public async findById(uuid: string): Promise<Product | null> {
    const product = await this.databaseRepository.findOne({ where: { uuid } });

    return product;
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.databaseRepository.find();

    return products;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.uuid);

    const existsProducts = await this.databaseRepository.find({
      where: { uuid: In(productIds) },
    });

    return existsProducts;
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = this.databaseRepository.create({
      name,
      price,
      quantity,
    });

    await this.databaseRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.databaseRepository.save(product);

    return product;
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.databaseRepository.save(products);
  }

  public async remove(product: Product): Promise<void> {
    await this.databaseRepository.remove(product);
  }
}

export { ProductsRepository };
