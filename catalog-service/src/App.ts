import express, {Express} from 'express';
import { IRouter } from './controllers/types';

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
      console.log(`Server started on port:${this.port}`);
    })

    process.on('uncaughtException', (err) => {
      console.log(err);
      process.exit(1);
    })
  }
}

export {App};