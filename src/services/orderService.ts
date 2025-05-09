import { dummyOrders } from "../assets/data";
import type { Order } from "../types/order";

export class OrderService {
  constructor() {}

  public async getOrders(): Promise<Order[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return dummyOrders;
  }
}

export const orderService = new OrderService();
export default orderService;
