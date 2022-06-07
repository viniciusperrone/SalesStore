import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

class ListCustomersService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = CustomersRepository;

    const customers = await customersRepository.find();

    return customers;
  }
}

export default ListCustomersService;
