import { ICatalogService } from '@/interface/ICatalogService';
import express, { NextFunction, Request, Response, Router } from 'express';
import { validate } from '@/middleware/validate';
import { CreateProductRequestSchema, CreateProductDto } from '@/dtos/ProductDto';

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
    this.router.post(this.path, validate(CreateProductRequestSchema), this.createProduct);
  }

  createProduct = async (
    req: Request<{}, {}, CreateProductDto>, 
    res: Response, 
    _next: NextFunction
  ) => {
    const result = await this.catalogService.createProduct(req.body);
    return res.status(201).json(result);
  }
}

export {CatalogController};