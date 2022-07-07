import { Container } from 'inversify';

import { ExampleService } from './ExampleModule/exampleService';

import { ExampleRepository } from './ExampleModule/exampleRepository';

import { ExampleMiddleware } from '@http/middleware/exampleMiddleware';
import { AuthMiddleware } from '@http/middleware/authMiddleware';

import { updateExampleItemDTO } from './ExampleModule/dto/updateExampleItemDto';
import { storeExampleItemDTO } from './ExampleModule/dto/storeExampleItemDto';

import { Uuid } from '@utils/Uuid/uuid';
import { JWT } from '@utils/JWT/jwt';
import { Bcrypt } from '@utils/Bcrypt/bcrypt';

const container = new Container({ defaultScope: 'Singleton' });

// Services
container.bind(ExampleService).toSelf();

// Repositories
container.bind(ExampleRepository).toSelf();

// Middlewares
container.bind(ExampleMiddleware).toSelf();
container.bind(AuthMiddleware).toSelf();

// Request DTOs
container.bind(updateExampleItemDTO).toSelf();
container.bind(storeExampleItemDTO).toSelf();

// Utils
container.bind(Uuid).toSelf();
container.bind(JWT).toSelf();
container.bind(Bcrypt).toSelf();

export default container;
