import { config } from "./config/config";
import { App } from "./App";
import {CatalogController} from "./controllers/CatalogController";


const app = new App(
  config.port, 
  [new CatalogController()]
)

app.startServer();