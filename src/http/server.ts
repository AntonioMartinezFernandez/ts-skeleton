// Environment variables
import { NODE_ENV, PORT } from '@config/environment';

// Dependencies
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import morgan from 'morgan';
import chalk from 'chalk';

// Controllers
import '@src/ExampleModule/exampleController';

// Http Server
export class HttpServer {
  private serverBuilder: InversifyExpressServer;
  private server: express.Application | undefined;

  constructor(private readonly container: Container) {
    this.serverBuilder = new InversifyExpressServer(this.container);
    console.clear();
  }

  config() {
    this.serverBuilder.setConfig((app: any) => {
      if (NODE_ENV !== 'production') {
        app.use(morgan('combined'));
      }
      app.use(express.json());
      app.use(cors());
      app.use(helmet());
      app.use(hpp());
      app.use(compression());
    });

    console.log(chalk.yellow('Server configuration loaded...'));
  }

  build() {
    this.server = this.serverBuilder.build();
    console.log(chalk.yellow('Server application builded...'));
  }

  start() {
    if (this.server) {
      this.server.listen(PORT, () => {
        console.log(chalk.blueBright(`======== ENV: ${NODE_ENV} ========`));
        console.log(chalk.blueBright(` 🚀 Server listening on port ${PORT}`));
        console.log(chalk.blueBright(`==================================`));
      });
    } else {
      console.log('ERROR: Server should be builded before start');
    }
  }
}
