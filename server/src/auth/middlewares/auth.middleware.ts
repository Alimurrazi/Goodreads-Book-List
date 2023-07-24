import express from 'express';
import usersService from '../../users/services/users.service';
import argon2 from 'argon2';

class AuthMiddleware {
  async verifyUserPassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await usersService.getByEmail(req.body.email);
    if (user) {
      const passwordHash = user.password;
      const check = await argon2.verify(passwordHash, req.body.password);
      if (check) {
        req.body = {
          usserId: user.id,
          email: user.email,
        };
        return next();
      }
    }
    res.status(400).send({ error: 'Invalid email or password' });
  }
}

export default new AuthMiddleware();
