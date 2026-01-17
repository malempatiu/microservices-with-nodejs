import { OrderDetailRequestDto, OrderRequestDto } from "@/dtos/OrderDto";
import { ICartRepository } from "@/interface/ICartRepository";
import { IOrderRepository } from "@/interface/IOrderRepository";
import { IOrderService } from "@/interface/IOrderService";
import { MessageBroker } from "@/message-broker/MessageBroker";
import { MessageType } from "@/message-broker/types";
import { AppError } from "@/utils/error";
import { STATUS_CODES } from "@/utils/status-codes";

class OrderService implements IOrderService {
  private readonly orderRepo: IOrderRepository;
  private readonly cartRepo: ICartRepository;
  private readonly messageBroker: MessageBroker;

  constructor (orderRepo: IOrderRepository, cartRepo: ICartRepository, messageBroker: MessageBroker) {
    this.orderRepo = orderRepo;
    this.cartRepo = cartRepo;
    this.messageBroker = messageBroker;
  }

  createOrder = async (customerId: number) => {
    const cartWithItems = await this.cartRepo.findByCustomerId(customerId);
    if (!cartWithItems.cartItems.length) {
      throw new AppError(STATUS_CODES.BAD_REQUEST, `No cart items found for the customer id: ${customerId}`);
    }
    const orderDetailsRequest: OrderDetailRequestDto[] = cartWithItems.cartItems.map((cartItem) => {
      return {
        productId: cartItem.productId,
        price: Number(cartItem.price),
        name: cartItem.itemName,
        quantity: cartItem.quantity
      }
    });
    const orderRequest: OrderRequestDto = {
      customerId,
      status: 'Pending',
      amount: orderDetailsRequest.reduce((amount, orderDetail) => {
        amount += orderDetail.price * orderDetail.quantity
        return amount;
      }, 0),
      orderDetails: orderDetailsRequest
    }
    const result = await this.orderRepo.create(orderRequest);
    // publish event to 'CatalogEvents' topic with 'order_created' event
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