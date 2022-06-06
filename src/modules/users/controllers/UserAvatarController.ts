import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    if (!request.file?.filename) {
      throw new AppError('No files have been inserted.');
    }
    const user = updateAvatar.execute({
      userId: request.user.uuid,
      avatarFileName: request.file.filename,
    });

    return response.json(user);
  }
}

export { UserAvatarController };
