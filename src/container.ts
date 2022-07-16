import { Container } from 'inversify';

import { ExampleService } from './ExampleModule/exampleService';
import { UserService } from './UserModule/userService';

import { ExampleMemoryRepository } from './ExampleModule/exampleMemoryRepository';
import { UserMemoryRepository } from './UserModule/userMemoryRepository';
import { UserMongoRepository } from './UserModule/userMongoRepository';

import { AuthMiddleware } from '@http/middleware/authMiddleware';

import { updateExampleItemDTO } from './ExampleModule/dto/ValidateUpdateExampleItemDto';
import { storeExampleItemDTO } from './ExampleModule/dto/ValidateStoreExampleItemDto';
import { updateUserDTO } from './UserModule/dto/ValidateUpdateUserDto';
import { storeUserDTO } from './UserModule/dto/ValidateStoreUserDto';

import { Uuid } from '@utilities/Uuid/Uuid';
import { JWT } from '@utilities/JWT/jwt';
import { Bcrypt } from '@utilities/Bcrypt/bcrypt';

const container = new Container({ defaultScope: 'Singleton' });

// Services
container.bind(ExampleService).toSelf();
container.bind(UserService).toSelf();

// Repositories
container.bind(ExampleMemoryRepository).toSelf();
container.bind(UserMemoryRepository).toSelf();
container.bind(UserMongoRepository).toSelf();

// Middlewares
container.bind(AuthMiddleware).toSelf();

// DTOs
container.bind(updateExampleItemDTO).toSelf();
container.bind(storeExampleItemDTO).toSelf();

container.bind(updateUserDTO).toSelf();
container.bind(storeUserDTO).toSelf();

// Utils
container.bind(Uuid).toSelf();
container.bind(JWT).toSelf();
container.bind(Bcrypt).toSelf();

export default container;
