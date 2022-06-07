import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  uuid: string;
}

class DeleteCustomerService {
  public async execute({ uuid }: IRequest): Promise<void> {
    const customersRepository = CustomersRepository;

    const customer = await customersRepository.findById(uuid);

    if (!customer) {
      throw new AppError('Customer not found!');
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
