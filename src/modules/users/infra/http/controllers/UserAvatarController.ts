import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService);

    if (!request.file?.filename) {
      throw new AppError('No files have been inserted.');
    }
    const user = updateAvatar.execute({
      user_id: request.user.uuid,
      avatarFileName: request.file.filename,
    });

    return response.json(instanceToInstance(user));
  }
}

export { UserAvatarController };
