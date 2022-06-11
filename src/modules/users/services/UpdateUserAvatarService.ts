import { injectable as Injectable, inject as Inject } from 'tsyringe';
import path from 'path';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import fs from 'fs';
import { IUsersRepository } from '../domain/repositories/IUsersRepositories';
import { IUser } from '../domain/models/IUser';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';

@Injectable()
class UpdateUserAvatarService {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    avatarFileName,
  }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
