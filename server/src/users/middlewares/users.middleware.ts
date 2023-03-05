import express from 'express';
import usersService from '../services/users.service';

class UsersMiddleware {
  async validateRequiredBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res.status(400).send({
        error: 'Missing required fileds email and password',
      });
    }
  }

  async validateSameEmailDoesnotExist(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await usersService.getByEmail(req.body.email);
    if (user) {
      res.status(400).send({ error: 'User email alredy exists' });
    } else {
      next();
    }
  }

  async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await usersService.readById(req.params.userId);
    if (user) {
      next();
    } else {
      res.status(404).send({
        error: `User ${req.params.userId} not found`,
      });
    }
  }

  async extractUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body.id = req.params.userId;
    next();
  }
}

export default new UsersMiddleware();
