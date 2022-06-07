import { dataSource } from '@shared/typeorm';
import User from '../entities/User';

const UsersRepository = dataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    const user = this.findOne({
      where: {
        name,
      },
    });

    return user;
  },
  async findById(uuid: string): Promise<User | null> {
    const user = this.findOne({
      where: {
        uuid,
      },
    });

    return user;
  },
  async findByEmail(email: string): Promise<User | null> {
    const user = this.findOne({
      where: {
        email,
      },
    });

    return user;
  },
});

export { UsersRepository };
