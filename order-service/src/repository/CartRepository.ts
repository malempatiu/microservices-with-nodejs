import { ICartRepository } from "@/interface/ICartRepository";
import { CartModel } from "@/models/CartModel";
import {dDB} from "@/lib/drizzle";
import { cartTable } from "@/db/schema/cart";

class CartRepository implements ICartRepository {  
  create = async (customerId: number): Promise<CartModel> => {
    const result = await dDB.insert(cartTable).values({
      customerId
    }).returning({cartId: cartTable.id});

    return {}
  }

  find = async (): Promise<CartModel[]> => {
    return []
  }

  findById = async (_id: number): Promise<CartModel | null> => {
    return null
  }

  update = async (_id: number, _data: CartModel): Promise<CartModel> => {
    return {}
  }

  delete = async (_id: number): Promise<void> => {
    
  }
}

export {CartRepository};

