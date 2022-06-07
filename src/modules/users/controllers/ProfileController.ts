import { UpdateProductService } from '@modules/products/services';
import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.uuid;

    const showProfileService = new ShowProfileService();

    const user = await showProfileService.execute({ user_id });

    return response.json(user);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.uuid;
    const { name, email, password, old_password } = request.body;

    const updateProfileService = new UpdateProfileService();

    const user = await updateProfileService.execute({
      user_id,
      ...request.body,
    });

    return response.json(user);
  }
}

export { ProfileController };
