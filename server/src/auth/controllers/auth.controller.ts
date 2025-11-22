import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import usersService from '../../users/services/users.service';

const jwtSecret: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
const log = debug('app:scraper-controller');
const tokenExpirationInSeconds = 36000;

class AuthController {
  async createJWT(req: express.Request, res: express.Response) {
    try {
      const refreshId = req.body.userId + jwtSecret;
      const salt = crypto.createSecretKey(crypto.randomBytes(16) as any);
      const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
      req.body.refreshKey = salt.export();
      const userInfoFromDb = await usersService.getByEmail(req.body.email);
      if (userInfoFromDb) {
        req.body.roles = (userInfoFromDb as any).roles;
      } else {
        throw new Error('User not found for accessing token.');
      }

      const tokenPayload = {
        email: req.body.email,
        userId: req.body.userId,
        refreshKey: salt.export(),
        roles: userInfoFromDb ? (userInfoFromDb as any).roles : [],
      };

      //      const token = jwt.sign(tokenPayload, jwtSecret, {
      const token = jwt.sign(req.body, jwtSecret, {
        expiresIn: tokenExpirationInSeconds,
      });
      return res.status(201).send({ accessToken: token, refreshToken: hash });
    } catch (error) {
      log('createJWT error', error);
      return res.status(500).send();
    }
  }
}

export default new AuthController();
