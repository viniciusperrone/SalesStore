import { dataSource } from '@shared/typeorm';
import UserToken from '../entities/UserToken';

const UserTokensRepository = dataSource.getRepository(UserToken).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  },
  async generate(user_id: string): Promise<UserToken> {
    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  },
});

export { UserTokensRepository };
