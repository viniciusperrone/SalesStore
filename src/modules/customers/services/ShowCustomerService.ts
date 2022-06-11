import { injectable as Injectable, inject as Inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import { ICustomersRepository } from '../domain/repositories/ICustomerRepository';
import { IShowCustomer } from '../domain/model';

@Injectable()
class ShowCustomerService {
  constructor(
    @Inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ uuid }: IShowCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(uuid);

    if (!customer) {
      throw new AppError('Customer not found!');
    }

    return customer;
  }
}

export default ShowCustomerService;
