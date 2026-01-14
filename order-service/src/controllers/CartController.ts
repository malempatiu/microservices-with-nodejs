import { ICartService } from '@/interface/ICartService';
import express, { NextFunction, Request, Response, Router } from 'express';

class CartController {
  public readonly router: Router;
  private readonly path: string;
  //private readonly cartService: ICartService;

  constructor(_cartService: ICartService) {
    this.router = express.Router();
    this.path = '/cart';
    //this.cartService = cartService;
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

export {CartController};