// Dependencies
import express from 'express';

import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

import { IStoreExampleItemDTO } from './IStoreExampleItemDto';

//Schema
const storeExampleItemSchema: JSONSchemaType<IStoreExampleItemDTO> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 30,
      nullable: false,
    },
  },
  required: ['name'],
  additionalProperties: false,
};

// Validator
const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(storeExampleItemSchema);

// Middleware
@injectable()
export class storeExampleItemDTO extends BaseMiddleware {
  constructor() {
    super();
  }
  public handler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const isDTOValid = validate(req.body);

    if (!isDTOValid)
      return res
        .status(400)
        .send(ajv.errorsText(validate.errors, { separator: '\n' }));

    next();
  }
}
