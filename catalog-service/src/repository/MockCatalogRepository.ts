import { ICatalogRepository } from "@/interface/ICatalogRepository";
import { ProductModel } from "@/models/ProductModel";

class MockCatalogRepository implements ICatalogRepository {
  create = async (_product: ProductModel): Promise<ProductModel> => {
    return {
      id: 1,
      ..._product,
    }
  }

  find = async (): Promise<ProductModel[]> => {
    return [{
      id: 1,
      name: 'iPhone',
      stock: 10,
      price: 1000,
      description: 'Smart phone'
    }, {
      id: 1,
      name: 'Laptop',
      stock: 100,
      price: 2000,
      description: 'Macbook Pro'
    }]
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

