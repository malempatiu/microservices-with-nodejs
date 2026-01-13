import { ICatalogRepository } from "@/interface/CatalogRepositoryInterface";

class CatalogService {
  private readonly catalogRepo: ICatalogRepository;

  constructor (catalogRepo: ICatalogRepository) {
    this.catalogRepo = catalogRepo;
  }

  createProduct = async (payload: any) => {

  }

  getProducts = async (limit = 25, offset = 0) => {

  }

  getProduct = async (id: number) => {

  }

  updateProduct = async (id: number, payload: any) => {

  }

  deleteProduct = async (id: number) => {

  }
}