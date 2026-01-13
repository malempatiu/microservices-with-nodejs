import { ICatalogRepository } from "@/interface/CatalogRepositoryInterface";
import { ProductModel } from "@/models/ProductModel";

class MockCatalogRepository implements ICatalogRepository {
  create = async (_product: ProductModel): Promise<ProductModel> => {
    return {
      id: 1,
      ..._product,
    }
  }

  find(): Promise<ProductModel[]> {
    throw new Error("Method not implemented.");
  }
  findById(_id: number): Promise<ProductModel | null> {
    throw new Error("Method not implemented.");
  }

  update = async (id: number, product: ProductModel): Promise<ProductModel> => {
    return {
      id,
      ...product
    }
  }

  delete(_id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export {MockCatalogRepository};

