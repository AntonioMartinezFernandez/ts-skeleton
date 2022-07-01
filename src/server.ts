// Environment variables
import { NODE_ENV, PORT } from './config/environment';

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
import './ExampleModule/example-controller';

// HTTP Server
export class HttpServer {
  private serverBuilder: any;
  private server: any;

  constructor(private readonly container: Container) {
    this.serverBuilder = new InversifyExpressServer(this.container);

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
  }

  build() {
    this.server = this.serverBuilder.build();
  }

  start() {
    this.server.listen(PORT, () => {
      console.clear();
      console.log(chalk.blueBright(`======= ENV: ${NODE_ENV} =======`));
      console.log(chalk.blueBright(` 🚀 App listening on port  ${PORT}`));
      console.log(chalk.blueBright(`================================`));
    });
  }
}
