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
  findById = async (id: number): Promise<ProductModel | null> => {
    return {
      id,
      name: 'iPhone',
      stock: 10,
      price: 1000,
      description: 'Smart phone'
    }
  }

  update = async (id: number, product: ProductModel): Promise<ProductModel> => {
    return {
      id,
      ...product
    }
  }

  delete = async (id: number): Promise<void> => {
    console.log(`Product with id: ${id} deleted`)
  }
}

export {MockCatalogRepository};

