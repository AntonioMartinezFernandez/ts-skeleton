// Dependencies
import 'reflect-metadata';
import { addAliases } from 'module-alias';

// Path Aliases
addAliases({
  '@src': __dirname + '/',
  '@config': __dirname + '/config',
  '@connectors': __dirname + '/connectors',
  '@http': __dirname + '/http',
  '@utils': __dirname + '/utils',
});

// IoC Container
import container from '@src/container';

// Start Http Server
import { HttpServer } from '@http/server';

const httpServer = new HttpServer(container);

httpServer.config();
httpServer.build();
httpServer.start();
