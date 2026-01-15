import { CreateProductDto } from "@/dtos/ProductDto";
import { ICatalogRepository } from "@/interface/ICatalogRepository";
import { ICatalogService } from "@/interface/ICatalogService";
import { AppError } from "@/utils/error";
import { STATUS_CODES } from "@/utils/status-codes";

class CatalogService implements ICatalogService {
  private readonly catalogRepo: ICatalogRepository;

  constructor (catalogRepo: ICatalogRepository) {
    this.catalogRepo = catalogRepo;
  }

  createProduct = async (dto: CreateProductDto) => {
    const result = await this.catalogRepo.create(dto);
    if (!result?.id) {
      throw new AppError(STATUS_CODES.INTERNAL_ERROR, 'Unable to create product!');
    }
    return result;
  }

  // Instead of this we will get products from ES
  getProducts = async (page = 0, limit = 25) => {
    const offset = (page - 1) * limit;
    const result = this.catalogRepo.find(limit, offset);
    return result;
  }

  getProduct = async (id: number) => {
    const result = await this.catalogRepo.findById(id);
    if (!result) {
      throw new AppError(STATUS_CODES.BAD_REQUEST, 'Product not found!')
    }

    return result;
  }

  updateProduct = async (id: number, dto: CreateProductDto) => {
    const result = await this.catalogRepo.update(id, dto);
    // emit event to update record in Elastic search
    return result;
  }

  // Delete record from ES
  deleteProduct = async (id: number) => {
    const product = await this.getProduct(id);
    await this.catalogRepo.delete(product.id!);
    return true;
  }
}

export {CatalogService};