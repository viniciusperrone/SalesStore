import { ICustomer } from '@modules/customers/domain/model/ICustomer';
import { ICreateOrderProducts } from './ICreateOrderProducts';

export interface ICreateOrder {
  customer: ICustomer;
  products: ICreateOrderProducts[];
}
