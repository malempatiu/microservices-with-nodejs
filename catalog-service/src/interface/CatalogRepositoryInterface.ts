import { ProductModel } from "@/models/ProductModel";

export interface ICatalogRepository {
  create(data: ProductModel): Promise<ProductModel>;
  find(): Promise<ProductModel[]>;
  findById(id: number): Promise<ProductModel | null>;
  update(id: number, data: ProductModel): Promise<ProductModel>;
  delete(id: number): Promise<void>;
}