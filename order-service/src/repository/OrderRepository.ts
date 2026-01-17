import { IOrderRepository } from "@/interface/IOrderRepository";
import { OrderDto, OrderRequestDto } from "@/dtos/OrderDto";
import { dDB } from "@/db/drizzle";
import { orderdetailsTable, orderTable } from "@/db/schema";

class OrderRepository implements IOrderRepository {  
  create = async (orderRequestDto: OrderRequestDto): Promise<OrderDto> => {
     const result = await dDB.insert(orderTable).values({
      customerId: orderRequestDto.customerId,
      amount: orderRequestDto.amount,
      status: orderRequestDto.status
    })
    .returning();

    const [{ id }] = result;

    if (id) {
      const orderDetails = orderRequestDto.orderDetails.map((orderDetail) => {
        return {
          ...orderDetail,
          orderId: id
        }
      })
      await dDB.insert(orderdetailsTable).values(orderDetails)    
    }

    return result[0];
  }

  find = async (): Promise<OrderDto[]> => {
    return []
  }

  findById = async (_id: number): Promise<OrderDto | null> => {
    return {} as OrderDto
  }

  update = async (_id: number, _data: any): Promise<OrderDto> => {
    return {} as OrderDto
  }

  delete = async (_id: number): Promise<void> => {
    
  }
}

export {OrderRepository};

