import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  request,
  response,
} from 'inversify-express-utils';
import { Request, Response } from 'express';
import { ExampleService } from './example-service';
import { IStoreExampleItemDTO } from './dtos/IStoreExampleItemDTO';
import { IUpdateExampleItemDTO } from './dtos/IUpdateExampleItemDTO';

@controller('/example-route')
export class ExampleController {
  constructor(private readonly _exampleService: ExampleService) {}

  @httpGet('/')
  async index(@response() res: Response) {
    const response = await this._exampleService.index();
    res.status(200).send(response);
  }

  @httpGet('/find/:id')
  async find(@request() req: Request, @response() res: Response) {
    const id = req.params.id as string;
    const response = await this._exampleService.find(id);
    if (response === undefined) res.status(404).send('Not found');
    res.status(200).send(response);
  }

  @httpPost('/store')
  async store(@request() req: Request, @response() res: Response) {
    const item: IStoreExampleItemDTO = { name: req.body.name as string };
    const response = await this._exampleService.store(item);
    res.status(201).send(response);
  }

  @httpPut('/update')
  async update(@request() req: Request, @response() res: Response) {
    const item: IUpdateExampleItemDTO = {
      id: req.body.id as string,
      name: req.body.name as string,
    };
    const response = await this._exampleService.update(item);

    if (!response) {
      res.sendStatus(400);
    } else {
      res.status(201).json({ msg: 'Updated successfully', item: response });
    }
  }

  @httpDelete('/delete/:id')
  async delete(@request() req: Request, @response() res: Response) {
    const id = req.params.id as string;
    const response = await this._exampleService.delete(id);

    if (!response) {
      res.sendStatus(400);
    } else {
      res.status(201).json({ msg: 'Deleted successfully', item: response });
    }
  }
}
