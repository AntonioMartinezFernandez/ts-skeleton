import {
  controller,
  httpMethod,
  request,
  response,
} from 'inversify-express-utils';
import { Request, Response } from 'express';

import { BaseController } from '@src/http/controllers/BaseController';

import { ExampleService } from './exampleService';

import { ExampleMiddleware } from '@http/middleware/exampleMiddleware';

import { IStoreExampleItemDTO } from './dto/IStoreExampleItemDto';
import { IUpdateExampleItemDTO } from './dto/IUpdateExampleItemDto';
import { updateExampleItemDTO } from './dto/updateExampleItemDto';
import { storeExampleItemDTO } from './dto/storeExampleItemDto';

@controller('/example')
export class ExampleController extends BaseController {
  constructor(private readonly _exampleService: ExampleService) {
    super();
  }

  @httpMethod('get', '/', ExampleMiddleware) //! Middleware Example
  async index(@response() res: Response) {
    const response = await this._exampleService.index();
    this.ok(res, response);
  }

  @httpMethod('get', '/find/:id')
  async find(@request() req: Request, @response() res: Response) {
    const id = req.params.id as string;
    const response = await this._exampleService.find(id);
    if (response === undefined) this.notFound(res);
    this.ok(res, response);
  }

  @httpMethod('post', '/store', storeExampleItemDTO)
  async store(@request() req: Request, @response() res: Response) {
    const item: IStoreExampleItemDTO = { name: req.body.name };
    const response = await this._exampleService.store(item);
    this.created(res, response);
  }

  @httpMethod('put', '/update', updateExampleItemDTO)
  async update(@request() req: Request, @response() res: Response) {
    const item: IUpdateExampleItemDTO = {
      id: req.body.id as string,
      name: req.body.name as string,
    };

    const response = await this._exampleService.update(item);

    if (!response) {
      this.notCreated(res);
    } else {
      this.updated(res, response);
    }
  }

  @httpMethod('delete', '/delete/:id')
  async delete(@request() req: Request, @response() res: Response) {
    const id = req.params.id as string;
    const response = await this._exampleService.delete(id);

    if (!response) {
      this.notCreated(res);
    } else {
      this.deleted(res, response);
    }
  }
}
