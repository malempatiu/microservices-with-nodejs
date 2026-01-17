import { config } from "./config/config";
import { App } from "./App";
import { logger } from "./utils/logger";


async function bootstrap() {
  try {
    const app = new App(config.port)

    await app.startServer();
  } catch (error) {
    logger.error(`Failed to start application: ${error}`);
    process.exit(1);
  }
}

bootstrap();