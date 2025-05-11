import type { LockReason } from "./enums/LockReasonEnum";
import type { ModelDesigner } from "./enums/ModelDesignerEnum";
import type { OrderStatus } from "./enums/OrderStatusEnum";
import type { OrderType } from "./enums/OrderTypeEnum";

export interface FilterState {
  orderId: string;
  status: OrderStatus[];
  type: OrderType[];
  lock: LockReason[];
  customer: string;
  model: ModelDesigner[];
  designer: ModelDesigner[];
  daysSinceOrder: string[];
}
