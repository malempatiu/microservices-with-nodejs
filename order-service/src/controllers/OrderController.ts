import { IOrderService } from '@/interface/IOrderService';
import express, { NextFunction, Request, Response, Router } from 'express';

class OrderController {
  public readonly router: Router;
  private readonly path: string;
  //private readonly orderService: IOrderService;

  constructor(_orderService: IOrderService) {
    this.router = express.Router();
    this.path = '/cart';
    //this.orderService = orderService;
    this.initializePaths();
  }

  initializePaths = () => {
    this.router.post(this.path, this.createCart);
    this.router.get(`${this.path}/:id`, this.getCart);
    this.router.put(`${this.path}/:id`, this.updateCart);
    this.router.delete(`${this.path}/:id`, this.deleteCart);
  }

  createCart = async (
    _req: Request, 
    _res: Response, 
    _next: NextFunction
  ) => {
    
  }

 
  getCart = async (_req: Request, _res: Response, _next: NextFunction) => {
    
  }

   updateCart = async (
    _req: Request, 
    _res: Response, 
    _next: NextFunction
  ) => {
    
  }

  deleteCart = async (_req: Request, _res: Response, _next: NextFunction) => {
    
  }

}

export {OrderController};