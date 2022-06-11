import { ICreateCustomer } from '../model/ICreateCustomer';
import { ICustomer } from '../model/ICustomer';

export interface ICustomersRepository {
  findAll(): Promise<ICustomer[]>;
  findByName(name: string): Promise<ICustomer | null>;
  findById(uuid: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
}
