import { CartCreateRequestDto } from "@/dtos/CartDto";
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

  createCart = async (dto: CartCreateRequestDto) => {
    const product = await getProductDetails(dto.productId);
    if (product.stock < dto.quantity) {
      throw new AppError(STATUS_CODES.BAD_REQUEST, 'Product out of stock!')
    }
    const result = await this.cartRepo.create({
      ...dto,
      price: product.price,
      name: product.name
    });
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

   deleteCart = async (id: number) => {
    const cart = await this.getCart(id);
    await this.cartRepo.delete(cart.id);
    return true;
  }

  updateCartItem = async (_cartId: number, itemId: number, dto: CartCreateRequestDto) => {
    const product = await getProductDetails(dto.productId);
    if (product.stock < dto.quantity) {
      throw new AppError(STATUS_CODES.BAD_REQUEST, 'Product out of stock!')
    }
    await this.cartRepo.updateItem(itemId, {
      ...dto,
      price: product.price,
      name: product.name
    });
  }

  deleteCartItem = async (id: number) => {
    await this.cartRepo.deleteItem(id);
    return true;
  }
}

export {CartService};