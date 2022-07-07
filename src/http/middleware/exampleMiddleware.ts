import express from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

@injectable()
export class ExampleMiddleware extends BaseMiddleware {
  constructor() {
    super();
  }
  public handler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    console.log('Message from ExampleMiddleware');
    next();
  }
}
