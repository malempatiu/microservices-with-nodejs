import { ICartRepository } from "@/interface/ICartRepository";
import {dDB} from "@/db/drizzle";
import { CartItem, cartItemsTable, cartTable } from "@/db/schema/cart";
import { CartCreateDto, CartDto } from "@/dtos/CartDto";
import { AppError } from "@/utils/error";
import { STATUS_CODES } from "@/utils/status-codes";
import { logger } from "@/utils/logger";
import { eq } from "drizzle-orm";

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

  findById = async (id: number): Promise<CartDto> => {
    const result = await dDB.query.cartTable.findFirst(
      {
        where: (cartTable, {eq}) => (eq(cartTable.id, id)),
        with: {
          cartItems: true,
        }
      }
    )

    if (!result) {
      logger.error('Cart not found!');
      throw new AppError(STATUS_CODES.BAD_REQUEST, 'Cart not found!');
    }

    return result as CartDto;
  }

   findByCustomerId = async (id: number): Promise<CartDto> => {
    const result = await dDB.query.cartTable.findFirst(
      {
        where: (cartTable, {eq}) => (eq(cartTable.customerId, id)),
        with: {
          cartItems: true,
        }
      }
    )

    if (!result) {
      logger.error('Cart not found!');
      throw new AppError(STATUS_CODES.BAD_REQUEST, 'Cart not found!');
    }

    return result as CartDto;
  }

  findItem = async (id: number): Promise<CartItem> => {
    const result = await dDB.query.cartItemsTable.findFirst(
      {
        where: (cartTable, {eq}) => (eq(cartTable.id, id)),
      }
    )

    if (!result) {
      logger.error('Cart item not found!');
      throw new AppError(STATUS_CODES.BAD_REQUEST, 'Cart item not found!');
    }

    return result as CartItem;
  }

  updateItem = async (id: number, dto: CartCreateDto): Promise<void> => {
    const item = await this.findItem(id);
    const result = await dDB.update(cartItemsTable).set({
      quantity: dto.quantity
    }).where(eq(cartItemsTable.id, item.id)).returning();

    if (!result.length) {
      logger.error('Unable to update cart item');
      throw new AppError(STATUS_CODES.INTERNAL_ERROR, 'Unable to update cart item!');
    }
  }

  deleteItem = async (id: number): Promise<void> => {
    const item = await this.findItem(id);
    const result = await dDB.delete(cartItemsTable).where((eq(cartItemsTable.id, id=item.id))).returning();
    if (!result.length) {
      logger.error('Unable to delete cart item');
      throw new AppError(STATUS_CODES.INTERNAL_ERROR, 'Unable to delete cart item!');
    }
  }

   delete = async (id: number): Promise<void> => {
    const cart = await this.findById(id);
    const result = await dDB.delete(cartTable).where((eq(cartTable.id, id=cart.id))).returning();
    if (!result.length) {
      logger.error('Unable to delete cart');
      throw new AppError(STATUS_CODES.INTERNAL_ERROR, 'Unable to delete cart!');
    }
  }
}

export {CartRepository};

