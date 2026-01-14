import { config } from "./config/config";
import { App } from "./App";
import {OrderController} from "./controllers/OrderController";
import {OrderService} from "./service/OrderService";
import { OrderRepository } from "./repository/OrderRepository";
import { CartRepository } from "./repository/CartRepository";
import { CartService } from "./service/CartService";
import { CartController } from "./controllers/CartController";


const app = new App(
  config.port, 
  [
    new OrderController(new OrderService(new OrderRepository())),
    new CartController(new CartService(new CartRepository())),
  ]
)

app.startServer();