import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  uuid: string;
}

class ShowCustomerService {
  public async execute({ uuid }: IRequest): Promise<Customer> {
    const customersRepository = CustomersRepository;

    const customer = await customersRepository.findById(uuid);

    if (!customer) {
      throw new AppError('Customer not found!');
    }

    return customer;
  }
}

export default ShowCustomerService;
