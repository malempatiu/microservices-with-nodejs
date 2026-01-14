import { ICatalogRepository } from "@/interface/CatalogRepositoryInterface";

class CatalogService {
  private readonly catalogRepo: ICatalogRepository;

  constructor (catalogRepo: ICatalogRepository) {
    this.catalogRepo = catalogRepo;
  }

  createProduct = async (_payload: any) => {
    const result = await this.catalogRepo.create(_payload);
    if (!result?.id) {
      throw new Error('Unable to create product!');
    }
    return result;
  }

  getProducts = async (limit = 25, offset = 0) => {
    const result = this.catalogRepo.find(limit, offset);
    return result;
  }

  getProduct = async (id: number) => {
    const result = await this.catalogRepo.findById(id);
    if (!result) {
      throw new Error('Product not found!')
    }

    return result;
  }

  updateProduct = async (id: number, payload: any) => {
    const result = await this.catalogRepo.update(id, payload);
    // emit event to update record in Elastic search
    return result;
  }

  deleteProduct = async (id: number) => {
    const product = await this.getProduct(id);
    await this.catalogRepo.delete(product.id!);
    return true;
  }
}

export {CatalogService};