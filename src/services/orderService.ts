import { dummyOrders } from "../assets/data.ts";
import type { Order } from "../types/order";
import { OrderStatus } from "../types/enums/OrderStatusEnum";
import { SortState } from "@/types/SortState.ts";
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

  public async getOrders(sortOrder: SortState): Promise<Order[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const { field, direction } = sortOrder;
    return [...this.orderList].sort((a, b) => {
      let valueA = a[field];
      let valueB = b[field];
      //Handle status field special case

      // Handle lock field special case
      if (field === "lock") {
        valueA = valueA || "None";
        valueB = valueB || "None";
      }

      // Handle different types
      if (typeof valueA === "number" && typeof valueB === "number") {
        return direction === "asc" ? valueA - valueB : valueB - valueA;
      }

      // Convert to string for comparison (handles enums and strings)
      const strA = String(valueA);
      const strB = String(valueB);
      return direction === "asc"
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });
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
    if (order.statusLeft === order.statusRight) {
      return order.statusLeft;
    }
    const leftIndex = STATUS_PRECEDENCE.indexOf(order.statusLeft);
    const rightIndex = STATUS_PRECEDENCE.indexOf(order.statusRight);
    return leftIndex > rightIndex
      ? order.statusLeft
      : order.statusRight || OrderStatus.OpenOrder;
  }
}

export const orderService = new OrderService();
export default orderService;
