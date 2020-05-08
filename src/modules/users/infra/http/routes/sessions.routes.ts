import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRespository = new UsersRepository();
  const authenticateUserService = new AuthenticateUserService(usersRespository);

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;

  return response.send({ user, token });
});

export default sessionsRouter;
