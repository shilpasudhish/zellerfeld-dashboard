import type { Order } from "./order";

export type SortState = {
  field: keyof Order;
  direction: "asc" | "desc";
};
