import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatar_filename: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatar_filename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user)
      throw new AppError('Only authenticated users can change avatar.', 401);

    if (user.avatar) {
      // Deletar avatar anterior

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatar_filename;

    return this.usersRepository.save(user);
  }
}

export default UpdateUserAvatarService;
