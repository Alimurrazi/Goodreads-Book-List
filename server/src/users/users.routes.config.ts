import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';

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
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send('list of users');
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send('post to users');
      });

    this.app
      .route(`/users/:userId`)
      // .all((req: express.Request, res: express.Response) => {
      //   console.log('all route passing me');
      // })
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send('User details');
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send('User details update');
      });

    return this.app;
  }
}
