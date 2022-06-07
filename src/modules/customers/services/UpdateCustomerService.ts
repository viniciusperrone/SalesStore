import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  uuid: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ uuid, name, email }: IRequest): Promise<Customer> {
    const customersRepository = CustomersRepository;

    const customer = await customersRepository.findById(uuid);

    if (!customer) {
      throw new AppError('Customer not found!');
    }

    const customerUpdateEmail = await customersRepository.findByEmail(email);

    if (customerUpdateEmail && customerUpdateEmail.uuid !== uuid) {
      throw new AppError('There is already one customer with this email!');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
