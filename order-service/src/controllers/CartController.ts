import { CartRequestSchema } from '@/dtos/CartDto';
import { ICartService } from '@/interface/ICartService';
import { validate } from '@/middleware/validate';
import express, { NextFunction, Request, Response, Router } from 'express';

class CartController {
  public readonly router: Router;
  private readonly path: string;
  private readonly cartService: ICartService;

  constructor(cartService: ICartService) {
    this.router = express.Router();
    this.path = '/cart';
    this.cartService = cartService;
    this.initializePaths();
  }

  initializePaths = () => {
    this.router.post(this.path,  validate(CartRequestSchema), this.createCart);
    this.router.get(`${this.path}/:id`, this.getCart);
    this.router.put(`${this.path}/:id`, validate(CartRequestSchema), this.updateCart);
    this.router.delete(`${this.path}/:id`, this.deleteCart);
  }

  createCart = async (
    req: Request, 
    res: Response, 
    _next: NextFunction
  ) => {
    const result = await this.cartService.createCart(req.body)
    return res.status(201).json(result);
  }

 
  getCart = async (_req: Request, res: Response, _next: NextFunction) => {
    return res.json({'hello': 'hello'});
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