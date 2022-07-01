import { Container } from 'inversify';

import { ExampleService } from './ExampleModule/example-service';
import { ExampleRepository } from './ExampleModule/example-repository';
import { Uuid } from './Utils/Uuid/Uuid';

const container = new Container({ defaultScope: 'Singleton' });

// Services
container.bind(ExampleService).toSelf();

// Repositories
container.bind(ExampleRepository).toSelf();

// Utils
container.bind(Uuid).toSelf();

export default container;
