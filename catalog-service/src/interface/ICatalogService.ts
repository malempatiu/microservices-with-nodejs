import { CreateProductDto } from "@/dtos/ProductDto";

export interface ICatalogService {
  createProduct(payload: CreateProductDto): Promise<any>;
  getProducts(page: number, limit: number): Promise<any>;
  getProduct(id: number): Promise<any>;
  updateProduct(id: number, payload: CreateProductDto): Promise<any>;
  deleteProduct(id: number): Promise<boolean>;
}