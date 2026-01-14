import express, {Express} from 'express';
import { IRouter } from './controllers/types';
import { prisma } from './lib/prisma';
import { ErrorMiddleware } from './middleware/ErrorMiddleware';
import { logger } from './utils/logger';

class App {
  private readonly app: Express;
  private readonly port: number;
  private readonly path: string;

  constructor(port: number, controllers: IRouter[]) {
    this.app = express()
    this.path = '/api'
    this.port = port;
    this.initializeMiddleWares();
    this.initializeRouters(controllers);
    this.initializeErrorMiddleWare();
  }

  initializeMiddleWares = () => {
    this.app.use(express.json());
  }

  initializeRouters = (controllers: IRouter[]) => {
    controllers.forEach((controller) => {
      this.app.use(this.path, controller.router);
    })
  }


  startServer = () => {
    this.app.listen(this.port, () => {
      logger.info(`Server started on port:${this.port}`);
    })

    process.on('uncaughtException', async (err) => {
      logger.error(err);
      await prisma.$disconnect()
      process.exit(1);
    })
  }

  private initializeErrorMiddleWare = () => {
    this.app.use(ErrorMiddleware.handler);
  }
}

export {App};