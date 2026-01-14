import { IOrderRepository } from "@/interface/IOrderRepository";
import { IOrderService } from "@/interface/IOrderService";

class OrderService implements IOrderService {
  private readonly orderRepo: IOrderRepository;

  constructor (orderRepo: IOrderRepository) {
    this.orderRepo = orderRepo;
  }

  createOrder = async (dto: any) => {
    const result = await this.orderRepo.create(dto);
    if (!result?.id) {
      throw new Error('Unable to create product!');
    }
    return result;
  }

  
  getOrder = async (id: number) => {
    const result = await this.orderRepo.findById(id);
    if (!result) {
      throw new Error('Product not found!')
    }

    return result;
  }

  updateOrder = async (id: number, dto: any) => {
    const result = await this.orderRepo.update(id, dto);
    return result;
  }

  deleteOrder = async (id: number) => {
    const product = await this.getOrder(id);
    await this.orderRepo.delete(product.id!);
    return true;
  }
}

export {OrderService};