import { IOrderService } from '@/interface/IOrderService';
import express, { NextFunction, Request, Response, Router } from 'express';

class OrderController {
  public readonly router: Router;
  private readonly path: string;
  private readonly orderService: IOrderService;

  constructor(orderService: IOrderService) {
    this.router = express.Router();
    this.path = '/order';
    this.orderService = orderService;
    this.initializePaths();
  }

  initializePaths = () => {
    this.router.post(this.path, this.createOrder);
  }

  createOrder = async (
    req: Request, 
    res: Response, 
    _next: NextFunction
  ) => {
    const result = await this.orderService.createOrder(Number(req.body.customerId));
    res.status(201).json(result)
  }
}

export {OrderController};