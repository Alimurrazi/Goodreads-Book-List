import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import ScraperController from './controllers/scraper.controller';
import jwtMiddleware from '../auth/middlewares/jwt.middleware';

export class ScraperRoutesConfig extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ScraperRoutes');
  }
  getName() {
    return this.name;
  }
  configureRoutes(): express.Application {
    this.app.route('/scraper/sync').post(jwtMiddleware.validJWTNeeded, ScraperController.syncContent);
    this.app.route('/scraper/single/sync').post(jwtMiddleware.validJWTNeeded, ScraperController.syncSingleBookContent);
    return this.app;
  }
}
