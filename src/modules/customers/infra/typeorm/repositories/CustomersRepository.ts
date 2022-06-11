import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';

import Customer from '../entities/Customer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { ICreateCustomer } from '@modules/customers/domain/model/ICreateCustomer';

class CustomersRepository implements ICustomersRepository {
  private databaseRepository: Repository<Customer>;

  constructor() {
    this.databaseRepository = dataSource.getRepository(Customer);
  }

  public async find(): Promise<Customer[]> {
    const customers = await this.databaseRepository.find();

    return customers;
  }
  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.databaseRepository.create({ name, email });

    await this.databaseRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.databaseRepository.save(customer);

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    await this.databaseRepository.remove(customer);
  }

  public async findAll(): Promise<Customer[]> {
    const customers = await this.databaseRepository.find();

    return customers;
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customer = await this.databaseRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(uuid: string): Promise<Customer | null> {
    const customer = await this.databaseRepository.findOne({ where: { uuid } });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.databaseRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}

export { CustomersRepository };
