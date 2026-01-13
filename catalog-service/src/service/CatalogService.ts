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

  getProducts = async (_limit = 25, _offset = 0) => {

  }

  getProduct = async (_id: number) => {

  }

  updateProduct = async (id: number, payload: any) => {
    const result = await this.catalogRepo.update(id, payload);
    // emit event to update record in Elastic search
    return result;
  }

  deleteProduct = async (_id: number) => {

  }
}

export {CatalogService};