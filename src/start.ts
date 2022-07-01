// Dependencies
import 'reflect-metadata';

// IoC Container
import container from './container';

// Start
import { HttpServer } from './server';

const httpServer = new HttpServer(container);

httpServer.build();
httpServer.start();
