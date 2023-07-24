import { CommonRoutesConfig } from '../common/common.routes.config';
import authController from './controllers/auth.controller';
import express from 'express';
import { body } from 'express-validator';
import authMiddleware from './middlewares/auth.middleware';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
  }
  getName() {
    return this.name;
  }
  configureRoutes(): express.Application {
    this.app.post(`/auth`, [
      body('email').isEmail(),
      body('password').isString(),
      authMiddleware.verifyUserPassword,
      authController.createJWT,
    ]);
    return this.app;
  }
}
