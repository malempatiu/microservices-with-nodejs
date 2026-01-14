import express, {Express} from 'express';
import { IRouter } from './controllers/types';
import { ErrorMiddleware } from './middleware/ErrorMiddleware';
import { httpLogger, logger } from './utils/logger';

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
    this.initializeErrorMiddleware();
  }

  initializeMiddleWares = () => {
    this.app.use(express.json());
    this.app.use(httpLogger);
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
      process.exit(1);
    })
  }

   private initializeErrorMiddleware = () => {
    this.app.use(ErrorMiddleware.handler);
  };
}

export {App};