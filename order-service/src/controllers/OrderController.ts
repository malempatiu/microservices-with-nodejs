import { IOrderService } from '@/interface/IOrderService';
import { MessageBroker } from '@/message-broker/MessageBroker';
import express, { NextFunction, Request, Response, Router } from 'express';

class OrderController {
  public readonly router: Router;
  private readonly path: string;
  private readonly messageBroker: MessageBroker;
  //private readonly orderService: IOrderService;

  constructor(_orderService: IOrderService, messageBroker: MessageBroker) {
    this.router = express.Router();
    this.path = '/order';
    //this.orderService = orderService;
    this.initializePaths();
    this.messageBroker = messageBroker;
  }

  initializePaths = () => {
    this.router.post(this.path, this.createOrder);
  }

  createOrder = async (
    req: Request, 
    res: Response, 
    _next: NextFunction
  ) => {
    await this.messageBroker.sendMessage({
      topic: 'OrderEvents',
      event: 'create_order',
      headers: {},
      message: {
        orderId: 1,
        productId: 2,
        customerId: 3
      }
    })
    res.status(201).json({'message': req.body})
  }
}

export {OrderController};