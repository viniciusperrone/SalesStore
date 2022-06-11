import { injectable as Injectable, inject as Inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';
import { IShowProduct } from '../domain/models/IShowProduct';

@Injectable()
class ShowProductService {
  constructor(
    @Inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ uuid }: IShowProduct): Promise<IProduct | null> {
    const product = this.productsRepository.findById(uuid);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
