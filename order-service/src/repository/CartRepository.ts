import { ICartRepository } from "@/interface/ICartRepository";
import {dDB} from "@/lib/drizzle";
import { cartItemsTable, cartTable } from "@/db/schema/cart";
import { CartCreateDto, CartDto } from "@/dtos/CartDto";
import { AppError } from "@/utils/error";
import { STATUS_CODES } from "@/utils/status-codes";
import { logger } from "@/utils/logger";

class CartRepository implements ICartRepository {  
  create = async (cartDto: CartCreateDto): Promise<CartDto> => {
    const [{id: cartId}] = await dDB.insert(cartTable).values({
      customerId: cartDto.customerId
    }).onConflictDoUpdate({
      target: cartTable.customerId,
      set: { updatedAt: new Date() },
    }).returning({
      id: cartTable.id
    });

    if (!cartId) {
      logger.error('Unable to create cart');
      throw new AppError(STATUS_CODES.INTERNAL_ERROR, 'Unable to create cart!');
    }

    const result = await dDB.insert(cartItemsTable).values({
      cartId,
      productId: cartDto.productId,
      itemName: cartDto.name,
      price: String(cartDto.price),
      quantity: cartDto.quantity
    }).returning()

    if (!result.length) {
      logger.error('Unable to create cart item');
      throw new AppError(STATUS_CODES.INTERNAL_ERROR, 'Unable to create cart!');
    }

    const cartItem = result[0];
    return {
      id: cartId,
      cartItem: [cartItem]
    }
  }

  find = async (): Promise<CartDto[]> => {
    return []
  }

  findById = async (_id: number): Promise<CartDto | null> => {
    return null
  }

  update = async (_id: number, _data: CartCreateDto): Promise<CartDto> => {
    return {} as CartDto;
  }

  delete = async (_id: number): Promise<void> => {
    
  }
}

export {CartRepository};

