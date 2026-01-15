import { ICartRepository } from "@/interface/ICartRepository";
import {dDB} from "@/db/drizzle";
import { cartItemsTable, cartTable } from "@/db/schema/cart";
import { CartCreateDto, CartDto } from "@/dtos/CartDto";
import { AppError } from "@/utils/error";
import { STATUS_CODES } from "@/utils/status-codes";
import { logger } from "@/utils/logger";

class CartRepository implements ICartRepository {  
  create = async (cartDto: CartCreateDto): Promise<CartDto> => {
    const [cart] = await dDB.insert(cartTable).values({
      customerId: cartDto.customerId
    }).onConflictDoUpdate({
      target: cartTable.customerId,
      set: { updatedAt: new Date() },
    }).returning({
      id: cartTable.id,
      customerId: cartTable.customerId
    });

    if (!cart) {
      logger.error('Unable to create cart');
      throw new AppError(STATUS_CODES.INTERNAL_ERROR, 'Unable to create cart!');
    }

    const result = await dDB.insert(cartItemsTable).values({
      cartId: cart.id,
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
      id: cart.id,
      customerId: cart.customerId,
      cartItems: [cartItem]
    }
  }

  findById = async (id: number): Promise<CartDto | null> => {
    const result = await dDB.query.cartTable.findFirst(
      {
        where: (cartTable, {eq}) => (eq(cartTable.id, id)),
        with: {
          cartItems: true,
        }
      }
    )

    return (result ?? {}) as CartDto;
  }

  update = async (_id: number, _data: CartCreateDto): Promise<CartDto> => {
    return {} as CartDto;
  }

  delete = async (_id: number): Promise<void> => {
    
  }
}

export {CartRepository};

