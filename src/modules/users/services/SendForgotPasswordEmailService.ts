import { injectable as Injectable, inject as Inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { EtherealMail } from '@config/mail/EtherealMail';
import path from 'path';
import { IUsersRepository } from '../domain/repositories/IUsersRepositories';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepositories';
import { ISendForgotPasswordEmail } from '../domain/models/ISendForgotPassword';

@Injectable()
class SendForgotPasswordEmailService {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @Inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}
  public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.userTokensRepository.generate(user.uuid);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgotPassword.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email,
      },
      subject: '[API Sales] Password Recovery',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3333/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
