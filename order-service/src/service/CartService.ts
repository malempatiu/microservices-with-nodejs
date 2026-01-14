import { CartCreateDto } from "@/dtos/CartDto";
import { ICartRepository } from "@/interface/ICartRepository";
import { ICartService } from "@/interface/ICartService";
import { AppError } from "@/utils/error";
import { STATUS_CODES } from "@/utils/status-codes";

class CartService implements ICartService {
  private readonly cartRepo: ICartRepository;

  constructor (cartRepo: ICartRepository) {
    this.cartRepo = cartRepo;
  }

  createCart = async (dto: CartCreateDto) => {
    const result = await this.cartRepo.create(dto);
    if (!result?.id) {
      throw new AppError(STATUS_CODES.INTERNAL_ERROR, 'Unable to create cart!');
    }
    return result;
  }

  getCart = async (id: number) => {
    const result = await this.cartRepo.findById(id);
    if (!result) {
      throw new AppError(STATUS_CODES.BAD_REQUEST, 'Product not found!')
    }

    return result;
  }

  updateCart = async (id: number, dto: any) => {
    const result = await this.cartRepo.update(id, dto);
    // emit event to update record in Elastic search
    return result;
  }

  // Delete record from ES
  deleteCart = async (id: number) => {
    const product = await this.getCart(id);
    await this.cartRepo.delete(product.id!);
    return true;
  }
}

export {CartService};