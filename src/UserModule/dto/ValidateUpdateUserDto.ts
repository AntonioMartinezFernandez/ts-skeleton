// Dependencies
import express from 'express';

import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

import { IUpdateUserDTO } from './IUpdateUserDto';

//Schema
const updateUserSchema: JSONSchemaType<IUpdateUserDTO> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
    },
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 50,
      nullable: true,
    },
    surname: {
      type: 'string',
      minLength: 2,
      maxLength: 50,
      nullable: true,
    },
    phone: {
      type: 'string',
      minLength: 6,
      maxLength: 15,
      nullable: true,
    },
    town: {
      type: 'string',
      minLength: 2,
      maxLength: 50,
      nullable: true,
    },
    city: {
      type: 'string',
      minLength: 2,
      maxLength: 50,
      nullable: true,
    },
    country: {
      type: 'string',
      minLength: 2,
      maxLength: 50,
      nullable: true,
    },
    birthdate: {
      type: 'string',
      format: 'date',
      nullable: true,
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 50,
      nullable: true,
    },
  },
  required: [],
  additionalProperties: false,
};

// Validator
const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(updateUserSchema);

// Middleware
@injectable()
export class updateUserDTO extends BaseMiddleware {
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
