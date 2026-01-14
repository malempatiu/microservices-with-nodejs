import { ICatalogRepository } from "@/interface/ICatalogRepository";
import { ProductModel } from "@/models/ProductModel";

class CatalogRepository implements ICatalogRepository {
  create = async (product: ProductModel): Promise<ProductModel> => {
    return {
      id: 1,
      ...product
    }
  }

  find = async (): Promise<ProductModel[]> => {
    return []
  }

  findById = async (id: number): Promise<ProductModel | null> => {
    return {
      id,
      name: 'iPhone',
      price: 1000,
      stock: 2,
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
    console.log(`Product with id: ${id} deleted`);
  }
}

export {CatalogRepository};

