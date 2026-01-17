import { IOrderRepository } from "@/interface/IOrderRepository";
import { IOrderService } from "@/interface/IOrderService";
import { MessageType } from "@/message-broker/types";
import { AppError } from "@/utils/error";
import { STATUS_CODES } from "@/utils/status-codes";

class OrderService implements IOrderService {
  private readonly orderRepo: IOrderRepository;

  constructor (orderRepo: IOrderRepository) {
    this.orderRepo = orderRepo;
  }

  createOrder = async (dto: any) => {
    const result = await this.orderRepo.create(dto);
    if (!result?.id) {
      throw new AppError(STATUS_CODES.INTERNAL_ERROR, 'Unable to create order!');
    }
    return result;
  }

  
  getOrder = async (id: number) => {
    const result = await this.orderRepo.findById(id);
    if (!result) {
      throw new AppError(STATUS_CODES.BAD_REQUEST, 'Product not found!')
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

  static handleSubscription = async (message: MessageType) => {
    console.log(message);
  }
}

export {OrderService};