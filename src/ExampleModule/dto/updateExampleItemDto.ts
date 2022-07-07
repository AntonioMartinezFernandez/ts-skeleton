// Dependencies
import express from 'express';

import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

import { IUpdateExampleItemDTO } from './IUpdateExampleItemDto';

//Schema
const updateExampleItemSchema: JSONSchemaType<IUpdateExampleItemDTO> = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid', nullable: false },
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 30,
      nullable: false,
    },
  },
  required: ['id', 'name'],
  additionalProperties: false,
};

// Validator
const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(updateExampleItemSchema);

// Middleware
@injectable()
export class updateExampleItemDTO extends BaseMiddleware {
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
