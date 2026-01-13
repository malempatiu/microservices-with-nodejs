import express, { NextFunction, Request, Response, Router } from 'express';

class CatalogController {
  public readonly router: Router;
  private readonly path: string;

  constructor() {
    this.router = express.Router();
    this.path = '/products'
    this.initializePaths();
  }

  initializePaths = () => {
    this.router.post(this.path, this.createProduct);
  }

  createProduct = async (_req: Request, _res: Response, _next: NextFunction) => {

  }

}

export {CatalogController};