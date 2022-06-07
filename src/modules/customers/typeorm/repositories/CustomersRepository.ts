import { dataSource } from '@shared/typeorm';
import Customer from '../entities/Customer';

const CustomersRepository = dataSource.getRepository(Customer).extend({
  async findByName(name: string): Promise<Customer | null> {
    const customer = this.findOne({
      where: {
        name,
      },
    });

    return customer;
  },
  async findById(uuid: string): Promise<Customer | null> {
    const customer = this.findOne({
      where: {
        uuid,
      },
    });

    return customer;
  },
  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.findOne({
      where: {
        email,
      },
    });

    return customer;
  },
});

export { CustomersRepository };
