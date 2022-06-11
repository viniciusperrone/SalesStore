import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';

import User from '../entities/User';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepositories';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';

class UsersRepository implements IUsersRepository {
  private databaseRepository: Repository<User>;

  constructor() {
    this.databaseRepository = dataSource.getRepository(User);
  }

  public async findAll(): Promise<User[]> {
    const users = await this.databaseRepository.find();

    return users;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await this.databaseRepository.findOne({ where: { name } });

    return user;
  }

  public async findById(uuid: string): Promise<User | null> {
    const user = await this.databaseRepository.findOne({ where: { uuid } });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.databaseRepository.findOne({ where: { email } });

    return user;
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.databaseRepository.create({ name, email, password });

    await this.databaseRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.databaseRepository.save(user);

    return user;
  }
}

export { UsersRepository };
