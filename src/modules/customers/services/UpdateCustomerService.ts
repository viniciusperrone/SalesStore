import { injectable as Injectable, inject as Inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import { ICustomersRepository } from '../domain/repositories/ICustomerRepository';
import { IUpdateCustomer } from '../domain/model';

@Injectable()
class UpdateCustomerService {
  constructor(
    @Inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ uuid, name, email }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(uuid);

    if (!customer) {
      throw new AppError('Customer not found!');
    }

    const customerUpdateEmail = await this.customersRepository.findByEmail(email);

    if (customerUpdateEmail && customerUpdateEmail.uuid !== uuid) {
      throw new AppError('There is already one customer with this email!');
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
