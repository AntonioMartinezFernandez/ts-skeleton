import {
  controller,
  httpMethod,
  request,
  response,
} from 'inversify-express-utils';
import { Request, Response } from 'express';
import { BaseController } from '@src/http/controllers/BaseController';
import { UserService } from './userService';
import { AuthMiddleware } from '@src/http/middleware/authMiddleware';
import { storeUserDTO } from './dto/ValidateStoreUserDto';
import { updateUserDTO } from './dto/ValidateUpdateUserDto';
import { IUpdateUserDTO } from './dto/IUpdateUserDto';

@controller('/user')
export class UserController extends BaseController {
  constructor(private readonly _userService: UserService) {
    super();
  }

  @httpMethod('get', '/')
  async index(@response() res: Response) {
    const response = { Status: 'OK' };
    this.ok(res, response);
  }

  @httpMethod('post', '/signup', storeUserDTO)
  async store(@request() req: Request, @response() res: Response) {
    const response = await this._userService.store(req.body);
    this.created(res, response);
  }

  @httpMethod('post', '/login')
  async login(@request() req: Request, @response() res: Response) {
    const { email, password } = req.body;
    const response = await this._userService.login(email, password);
    if (response === undefined) {
      this.notFound(res);
    } else {
      this.ok(res, response);
    }
  }

  @httpMethod('put', '/profile', updateUserDTO, AuthMiddleware)
  async updateProfile(@request() req: Request, @response() res: Response) {
    const user: IUpdateUserDTO = {
      id: req.body.user.id,
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      town: req.body.town,
      city: req.body.city,
      country: req.body.country,
      birthdate: req.body.birthdate,
      password: req.body.password,
    };

    const response = await this._userService.update(user);

    if (response === undefined) {
      this.notFound(res);
    } else {
      this.ok(res, response);
    }
  }

  @httpMethod('get', '/profile', AuthMiddleware)
  async getProfile(@request() req: Request, @response() res: Response) {
    const id = req.body.user.id;
    const response = await this._userService.profile(id);
    if (response === undefined) {
      this.notFound(res);
    } else {
      this.ok(res, response);
    }
  }

  @httpMethod('delete', '/profile', AuthMiddleware)
  async deleteProfile(@request() req: Request, @response() res: Response) {
    const id = req.body.user.id;
    const response = await this._userService.delete(id);
    if (response === undefined) {
      this.notFound(res);
    } else {
      this.ok(res);
    }
  }
}
