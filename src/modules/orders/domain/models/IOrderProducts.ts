import { IOrder } from './IOrder';
import { IProduct } from '@modules/products/domain/models/IProduct';

export interface IOrderProducts {
  uuid: string;
  order: IOrder;
  product: IProduct;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
