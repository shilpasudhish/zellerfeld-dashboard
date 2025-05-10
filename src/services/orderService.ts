import { dummyOrders } from "../assets/data.ts";
import type { Order } from "../types/order";
import { OrderStatus } from "../types/enums/OrderStatusEnum";

const STATUS_PRECEDENCE: OrderStatus[] = [
  OrderStatus.Delivered,
  OrderStatus.ReadyForPackaging,
  OrderStatus.QC,
  OrderStatus.Drying,
  OrderStatus.Printing,
  OrderStatus.OpenOrder,
];

export class OrderService {
  private orderList: Order[] = this.getCompleteOrders();
  constructor() {}

  public async getOrders(): Promise<Order[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Fetching orders...", dummyOrders);
    return this.orderList;
  }

  private getCompleteOrders(): Order[] {
    return dummyOrders.map((order) => ({
      ...order,
      status: this.computeStatus(order),
    }));
  }

  private computeStatus(order: Order): OrderStatus {
    if (
      !STATUS_PRECEDENCE.includes(order.statusLeft) ||
      !STATUS_PRECEDENCE.includes(order.statusRight)
    ) {
      console.warn("Unknown status value", order.statusLeft, order.statusRight);
      return OrderStatus.OpenOrder;
    }
    const leftIndex = STATUS_PRECEDENCE.indexOf(order.statusLeft);
    const rightIndex = STATUS_PRECEDENCE.indexOf(order.statusRight);
    return leftIndex >= rightIndex
      ? order.statusLeft
      : order.statusRight || OrderStatus.OpenOrder;
  }
}

export const orderService = new OrderService();
export default orderService;
