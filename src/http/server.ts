// Environment variables
import { ENVIRONMENT, PORT } from '@config/environment';

// Dependencies
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import morgan from 'morgan';

// Controllers
import '@src/ExampleModule/exampleController';
import '@src/UserModule/userController';
import { mongodbConnect } from '@database/mongoDB/mongodbConnector';

// Http Server
export class HttpServer {
  private serverBuilder: InversifyExpressServer;
  private server: express.Application | undefined;
  private connectMongoDB = false;

  constructor(private readonly container: Container) {
    this.serverBuilder = new InversifyExpressServer(this.container);
    console.clear();
  }

  mongoDB() {
    this.connectMongoDB = true;
  }

  config() {
    this.serverBuilder.setConfig((app: any) => {
      if (ENVIRONMENT !== 'production') {
        app.use(morgan('combined'));
      }
      app.use(express.json());
      app.use(cors());
      app.use(helmet());
      app.use(hpp());
      app.use(compression());
    });

    console.log('Server configuration loaded...');
  }

  build() {
    this.server = this.serverBuilder.build();
  }

  async start() {
    if (this.connectMongoDB) {
      try {
        await mongodbConnect();
        console.log('MongoDB connected...');
      } catch (err) {
        console.log('MongoDB ERROR...');
      }
    }

    if (this.server) {
      this.server.listen(PORT, () => {
        console.log(` Environment: ${ENVIRONMENT}`);
        console.log(` 🚀 Server listening on port ${PORT}`);
      });
    } else {
      console.log('ERROR: Server should be builded before start');
    }
  }
}
