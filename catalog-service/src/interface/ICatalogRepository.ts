import { CreateProductDto } from "@/dtos/ProductDto";
import { ProductModel } from "@/models/ProductModel";

export interface ICatalogRepository {
  create(data: CreateProductDto): Promise<ProductModel>;
  find(limit: number, offset: number): Promise<ProductModel[]>;
  findById(id: number): Promise<ProductModel | null>;
  update(id: number, data: CreateProductDto): Promise<ProductModel>;
  delete(id: number): Promise<void>;
}