import { ICartRepository } from "@/interface/ICartRepository";
import { CartModel } from "@/models/CartModel";
// import {dDB} from "@/lib/drizzle";
// import { cartTable } from "@/db/schema/cart";
import { CartCreateDto } from "@/dtos/CartDto";

class CartRepository implements ICartRepository {  
  create = async (_data: CartCreateDto): Promise<CartModel> => {
    // const result = await dDB.insert(cartTable).values({
      
    // }).returning({cartId: cartTable.id});

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

