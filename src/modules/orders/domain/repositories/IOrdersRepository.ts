import { ICreateOrder } from '../models/ICreateOrder';
import { IOrder } from '../models/IOrder';

export interface IOrdersRepository {
  findById(uuid: string): Promise<IOrder | null>;
  create(data: ICreateOrder): Promise<IOrder>;
}
