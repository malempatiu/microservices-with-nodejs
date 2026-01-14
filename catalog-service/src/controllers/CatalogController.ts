import { ICatalogService } from '@/interface/ICatalogService';
import express, { NextFunction, Request, Response, Router } from 'express';

class CatalogController {
  public readonly router: Router;
  private readonly path: string;
  private readonly catalogService: ICatalogService;

  constructor(catalogService: ICatalogService) {
    this.router = express.Router();
    this.path = '/products';
    this.catalogService = catalogService;
    this.initializePaths();
  }

  initializePaths = () => {
    this.router.post(this.path, this.createProduct);
  }

  createProduct = async (req: Request, res: Response, _next: NextFunction) => {
    const result = await this.catalogService.createProduct(req.body);
    return res.status(201).json(result);
  }

}

export {CatalogController};