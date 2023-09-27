import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import usersController from './controllers/users.controller';
import usersMiddleware from './middlewares/users.middleware';
import jwtMiddleware from '../auth/middlewares/jwt.middleware';

export class UserRoutesConfig extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }
  getName() {
    return this.name;
  }
  configureRoutes(): express.Application {
    this.app
      .route('/users')
      .get(usersController.getUsers)
      .post(
        jwtMiddleware.validJWTNeeded,
        usersMiddleware.validateRequiredBodyFields,
        usersMiddleware.validateSameEmailDoesnotExist,
        usersController.createUser,
      );

    this.app.param('userId', usersMiddleware.extractUserId);

    this.app
      .route(`/users/:userId`)
      .all(usersMiddleware.validateUserExists)
      .get(usersController.getUserById)
      .delete(usersController.removeUser)
      .put(usersMiddleware.validateRequiredBodyFields, usersController.putUser)
      .patch(usersController.patchUser);

    return this.app;
  }
}
