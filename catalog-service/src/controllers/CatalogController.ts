import { ICatalogService } from '@/interface/ICatalogService';
import express, { NextFunction, Request, Response, Router } from 'express';
import { validate } from '@/middleware/validate';
import { CreateProductRequestSchema } from '@/dtos/ProductDto';
import { PaginationQueryParams } from '@/dtos/PaginationQueryDto';

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
    this.router.get(this.path, this.getProducts);
    this.router.get(`${this.path}/:id`, this.getProduct);
    this.router.put(`${this.path}/:id`, this.updateProduct);
    this.router.delete(`${this.path}/:id`, this.deleteProduct);
  }

  createProduct = async (
    req: Request, 
    res: Response, 
    _next: NextFunction
  ) => {
    const result = await this.catalogService.createProduct(req.body);
    return res.status(201).json(result);
  }

  getProducts = async (req: Request, res: Response, _next: NextFunction) => {
    const validation = PaginationQueryParams.safeParse(req.query);

    if (!validation.success) {
      return res.status(400).json({
        message: "Invalid pagination params",
        errors: validation.error.issues,
      });
    }

    const { page, limit } = validation.data;

    const result = await this.catalogService.getProducts(page, limit);
    return res.status(200).json(result);
  }

  getProduct = async (req: Request, res: Response, _next: NextFunction) => {
    const result = await this.catalogService.getProduct(Number(req.params.id));
    return res.status(200).json(result);
  }

   updateProduct = async (
    req: Request, 
    res: Response, 
    _next: NextFunction
  ) => {
    const result = await this.catalogService.updateProduct(Number(req.params.id), req.body);
    return res.status(201).json(result);
  }

  deleteProduct = async (req: Request, res: Response, _next: NextFunction) => {
    await this.catalogService.deleteProduct(Number(req.params.id));
    return res.status(204).json({'message': 'success'});
  }

}

export {CatalogController};