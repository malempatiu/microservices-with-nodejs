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
    this.router.delete(`${this.path}/:id`, this.deleteCart);
    this.router.put(`${this.path}/:id/item/:itemId`, validate(CartRequestSchema), this.updateCartItem);
    this.router.delete(`${this.path}/:id/item/:itemId`, this.deleteCartItem);
  }

  createCart = async (
    req: Request, 
    res: Response, 
    _next: NextFunction
  ) => {
    const result = await this.cartService.createCart(req.body)
    return res.status(201).json(result);
  }

 
  getCart = async (req: Request, res: Response, _next: NextFunction) => {
    const result = await this.cartService.getCart(Number(req.params.id));
    return res.status(200).json(result);
  }

  deleteCart = async (req: Request, res: Response, _next: NextFunction) => {
    await this.cartService.deleteCart(Number(req.params.id));
    return res.status(204).json({'message': 'Success'});
  }

  deleteCartItem = async (req: Request, res: Response, _next: NextFunction) => {
    await this.cartService.deleteCartItem(Number(req.params.itemId));
    return res.status(204).json({'message': 'Success'});
  }

   updateCartItem = async (
    req: Request, 
    res: Response, 
    _next: NextFunction
  ) => {
    await this.cartService.updateCartItem(
      Number(req.params.id), 
      Number(req.params.itemId),
      req.body
    )
    return res.status(201).json({'message': 'success'});
  }

  

}

export {CartController};