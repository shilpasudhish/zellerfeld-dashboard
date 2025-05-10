import { ModelDesigner } from "./enums/ModelDesignerEnum";
import { OrderStatus } from "./enums/OrderStatusEnum";
import { OrderType } from "./enums/OrderTypeEnum";
import { LockReason } from "./enums/LockReasonEnum";
export interface Order {
  oid: number;
  statusLeft: OrderStatus;
  statusRight: OrderStatus;
  status: OrderStatus | "";
  type: OrderType;
  lock: LockReason | "" | null;
  customer: string;
  daysSinceOrder: number;
  model: ModelDesigner;
  designer: ModelDesigner;
}
