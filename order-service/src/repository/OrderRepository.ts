import { OrderModel } from "@/models/OrderModel";
import { IOrderRepository } from "@/interface/IOrderRepository";

class OrderRepository implements IOrderRepository {  
  create = async (_product: any): Promise<OrderModel> => {
    return {}
  }

  find = async (): Promise<OrderModel[]> => {
    return []
  }

  findById = async (_id: number): Promise<OrderModel | null> => {
    return {}
  }

  update = async (_id: number, _data: any): Promise<OrderModel> => {
    return {}
  }

  delete = async (_id: number): Promise<void> => {
    
  }
}

export {OrderRepository};

