import { injectable as Injectable, inject as Inject } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepositories';
import { IUser } from '../domain/models/IUser';

@Injectable()
class ListUsersService {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute(): Promise<IUser[]> {
    const users = this.usersRepository.findAll();

    return users;
  }
}

export default ListUsersService;
