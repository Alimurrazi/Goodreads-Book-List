import express from 'express';
import { Jwt } from '../../common/types/jwt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtSecret: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';

class JwtMiddleware {
  verifyRefreshBodyField(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body && req.body.refreshToken) {
      return next();
    } else {
      return res.status(400).send({ errors: 'Missing required fields refereshToken' });
    }
  }

  validJWTNeeded(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.headers['authorization']) {
      try {
        const authorization = req.headers['authorization'].split(' ');
        if (authorization[0] !== 'Bearer') {
          return res.status(401).send();
        } else {
          res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as Jwt;
          next();
        }
      } catch (error) {
        return res.status(403).send();
      }
    } else {
      return res.status(401).send();
    }
  }
}
export default new JwtMiddleware();
