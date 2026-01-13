import { ICatalogRepository } from "@/interface/CatalogRepositoryInterface";
import { ProductModel } from "@/models/ProductModel";

class CatalogRepository implements ICatalogRepository {
  create(product: ProductModel): Promise<ProductModel> {
    throw new Error("Method not implemented.");
  }
  find(): Promise<ProductModel[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<ProductModel | null> {
    throw new Error("Method not implemented.");
  }
  update(id: number, product: ProductModel): Promise<ProductModel> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

