import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import { EtherealMail } from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = UsersRepository;
    const userTokenRepository = UserTokensRepository;

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await userTokenRepository.generate(user.uuid);

    await EtherealMail.sendMail({
      to: email,
      body: `Password reset request received! ${token}`,
    });
  }
}

export default SendForgotPasswordEmailService;
