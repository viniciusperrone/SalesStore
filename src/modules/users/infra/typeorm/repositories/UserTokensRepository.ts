import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';

import UserToken from '../entities/UserToken';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepositories';

class UserTokensRepository implements IUserTokensRepository {
  private databaseRepository: Repository<UserToken>;

  constructor() {
    this.databaseRepository = dataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.databaseRepository.findOne({
      where: { token },
    });

    return userToken;
  }
  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.databaseRepository.create({ user_id });

    await this.databaseRepository.save(userToken);

    return userToken;
  }
}

export { UserTokensRepository };
