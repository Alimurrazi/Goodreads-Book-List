import express from 'express';

class JwtMiddleware {
  verifyRefreshBodyField(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body && req.body.refreshToken) {
      return next();
    } else {
      return res.status(400).send({ errors: 'Missing required fields refereshToken' });
    }
  }
}
