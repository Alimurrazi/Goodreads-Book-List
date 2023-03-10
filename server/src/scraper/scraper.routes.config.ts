import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import ScraperController from './controllers/scraper.controller';

export class ScraperRoutesConfig extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ScraperRoutes');
  }
  getName() {
    return this.name;
  }
  configureRoutes(): express.Application {
    this.app.route('/scraper/sync').post(ScraperController.syncContent);
    return this.app;
  }
}
