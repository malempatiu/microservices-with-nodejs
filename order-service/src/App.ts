import express, { Express } from 'express';
import { Server } from 'http';
import { ErrorMiddleware } from './middleware/ErrorMiddleware';
import { httpLogger, logger } from './utils/logger';
import { MessageBroker } from './message-broker/MessageBroker';
import { OrderController } from './controllers/OrderController';
import { OrderService } from './service/OrderService';
import { OrderRepository } from './repository/OrderRepository';
import { CartController } from './controllers/CartController';
import { CartService } from './service/CartService';
import { CartRepository } from './repository/CartRepository';

class App {
  private readonly app: Express;
  private readonly port: number;
  private readonly path: string;
  private server?: Server;
  private messageBroker?: MessageBroker;
  private isShuttingDown: boolean = false;

  constructor(port: number) {
    this.app = express();
    this.path = '/api';
    this.port = port;
    
    this.setupProcessHandlers();
    this.initializeMiddlewares();
    this.initializeHealthCheck();
    this.initializeErrorMiddleware();
  }

  private setupProcessHandlers = () => {
    process.on('uncaughtException', (err: Error) => {
      logger.error(`Uncaught Exception:${err.message}`, );
      this.gracefulShutdown(1);
    });

    process.on('unhandledRejection', (reason, _promise) => {
      logger.error(`Unhandled Rejection at: ${reason}`);
      this.gracefulShutdown(1);
    });

    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, starting graceful shutdown');
      this.gracefulShutdown(0);
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT received, starting graceful shutdown');
      this.gracefulShutdown(0);
    });
  };

  private initializeMiddlewares = () => {
    this.app.use(express.json());
    this.app.use(httpLogger);
  };

  private initializeControllers = () => {
    if (!this.messageBroker) {
      throw new Error('MessageBroker not initialized');
    }
    const controllers = [
      new OrderController(new OrderService(new OrderRepository()), this.messageBroker),
      new CartController(new CartService(new CartRepository())),
    ]
    controllers.forEach((controller) => {
      this.app.use(this.path, controller.router);
    });
  };

  private initializeHealthCheck = () => {
    this.app.get('/health', (_req, res) => {
      const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        messageBroker: this.messageBroker?.isHealthy() ?? false
      };

      const statusCode = health.messageBroker ? 200 : 503;
      res.status(statusCode).json(health);
    });

    // Readiness probe (for k8s)
    this.app.get('/ready', (_req, res) => {
      if (this.messageBroker?.isHealthy()) {
        res.status(200).json({ ready: true });
      } else {
        res.status(503).json({ ready: false, reason: 'Message broker not ready' });
      }
    });
  };

  private initializeErrorMiddleware = () => {
    this.app.use(ErrorMiddleware.handler);
  };

  private async bootstrapMessageBroker(): Promise<void> {
    try {
      logger.info('Initializing message broker...');
      this.messageBroker = new MessageBroker();
      await this.messageBroker.start();
      logger.info('Message broker initialized successfully');
    } catch (error: any) {
      logger.error(`Failed to initialize message broker:${error}`);
      throw error; // Fail fast if Kafka is required
    }
  }

  async initialize(): Promise<void> {
    try {
      // Bootstrap all async dependencies
      await this.bootstrapMessageBroker();

      await this.initializeControllers();
      logger.info('Application initialized successfully');
    } catch (error: any) {
      logger.error(`Application initialization failed:${error}`);
      throw error;
    }
  }

  async startServer(): Promise<void> {
    try {
      // Initialize async dependencies first
      await this.initialize();

      // Start HTTP server
      this.server = this.app.listen(this.port, () => {
        logger.info(`Server started on port ${this.port}`);
        logger.info(`Health check available at http://localhost:${this.port}/health`);
      });

      // Handle server errors
      this.server.on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE') {
          logger.error(`Port ${this.port} is already in use`);
        } else {
          logger.error(`Server error: ${error.message}`);
        }
        this.gracefulShutdown(1);
      });

    } catch (error: any) {
      logger.error(`Failed to start server: ${error}`);
      process.exit(1);
    }
  }

  private async gracefulShutdown(exitCode: number): Promise<void> {
    if (this.isShuttingDown) {
      logger.warn('Shutdown already in progress');
      return;
    }

    this.isShuttingDown = true;
    logger.info('Starting graceful shutdown...');

    // Set a timeout to force shutdown if graceful shutdown takes too long
    const forceShutdownTimeout = setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 30000); // 30 seconds

    try {
      // Stop accepting new requests
      if (this.server) {
        await new Promise<void>((resolve, reject) => {
          this.server!.close((err?: Error) => {
            if (err) {
              logger.error(`Error closing HTTP server: ${err}`);
              reject(err);
            } else {
              logger.info('HTTP server closed');
              resolve();
            }
          });
        });
      }

      // Close message broker
      if (this.messageBroker) {
        await this.messageBroker.stop();
        logger.info('Message broker stopped');
      }

      clearTimeout(forceShutdownTimeout);
      logger.info('Graceful shutdown completed');
      process.exit(exitCode);
    } catch (error: any) {
      logger.error(`Error during graceful shutdown: ${error}`);
      clearTimeout(forceShutdownTimeout);
      process.exit(1);
    }
  }

  // Expose for dependency injection
  getMessageBroker(): MessageBroker | undefined {
    return this.messageBroker;
  }

  // Expose for testing
  getExpressApp(): Express {
    return this.app;
  }
}

export { App };