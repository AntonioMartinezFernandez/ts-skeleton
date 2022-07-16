// Dependencies
import 'reflect-metadata';
import { addAliases } from 'module-alias';

// Path Aliases
addAliases({
  '@src': __dirname + '/',
  '@config': __dirname + '/config',
  '@database': __dirname + '/database',
  '@http': __dirname + '/http',
  '@utilities': __dirname + '/utilities',
});

// IoC Container
import container from '@src/container';

// Start Http Server
import { HttpServer } from '@http/server';

const httpServer = new HttpServer(container);

httpServer.config();
httpServer.build();
httpServer.mongoDB();
httpServer.start();
