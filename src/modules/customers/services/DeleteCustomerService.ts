import { injectable as Injectable, inject as Inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { ICustomersRepository } from '../domain/repositories/ICustomerRepository';
import { IDeleteCustomer } from '../domain/model';

@Injectable()
class DeleteCustomerService {
  constructor(
    @Inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ uuid }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(uuid);

    if (!customer) {
      throw new AppError('Customer not found!');
    }

    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
