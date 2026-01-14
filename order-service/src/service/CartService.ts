import { CartCreateDto } from "@/dtos/CartDto";
import { ICartRepository } from "@/interface/ICartRepository";
import { ICartService } from "@/interface/ICartService";
import { getProductDetails } from "@/utils/api";
import { AppError } from "@/utils/error";
import { STATUS_CODES } from "@/utils/status-codes";

class CartService implements ICartService {
  private readonly cartRepo: ICartRepository;

  constructor (cartRepo: ICartRepository) {
    this.cartRepo = cartRepo;
  }

  createCart = async (dto: CartCreateDto) => {
    console.log(typeof(dto.productId))
    const product = await getProductDetails(dto.productId);
    if (product.stock < dto.quantity) {
      throw new AppError(STATUS_CODES.BAD_REQUEST, 'Product out of stock!')
    }
    // const result = await this.cartRepo.create(dto);
    // if (!result?.id) {
    //   throw new AppError(STATUS_CODES.INTERNAL_ERROR, 'Unable to create cart!');
    // }
    return product;
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