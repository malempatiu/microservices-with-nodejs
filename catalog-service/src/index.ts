import { config } from "./config/config";
import { App } from "./App";
import {CatalogController} from "./controllers/CatalogController";
import {CatalogService} from "./service/CatalogService";
import { CatalogRepository } from "./repository/CatalogRepository";


const app = new App(
  config.port, 
  [new CatalogController(new CatalogService(new CatalogRepository()))]
)

app.startServer();