import { Request, Response } from 'express';
import {
  CreateProductService,
  ListProductsService,
  ShowProductService,
  UpdateProductService,
  DeleteProductService,
} from '../services';

class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductsService();

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params;

    const showProducts = new ShowProductService();

    const product = await showProducts.execute({ uuid });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({ name, price, quantity });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params;
    const { name, price, quantity } = request.body;

    const updateProduct = new UpdateProductService();

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

    const deleteProducts = new DeleteProductService();

    const product = await deleteProducts.execute({ uuid });

    return response.json([]);
  }
}

export { ProductController };
