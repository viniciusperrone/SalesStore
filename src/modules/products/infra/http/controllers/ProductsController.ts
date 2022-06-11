import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
  CreateProductService,
  ListProductsService,
  ShowProductService,
  UpdateProductService,
  DeleteProductService,
} from '@modules/products/services';

class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params;

    const showProducts = container.resolve(ShowProductService);

    const product = await showProducts.execute({ uuid });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({ name, price, quantity });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params;
    const { name, price, quantity } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      uuid,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params;

    const deleteProducts = container.resolve(DeleteProductService);

    await deleteProducts.execute({ uuid });

    return response.json([]);
  }
}

export { ProductsController };
