import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/services/orderService";
import type { Order } from "@/types/order";
import type { SortState } from "@/types/SortState";
export const useOrders = (sortOrder: SortState) => {
  return useQuery<Order[]>({
    queryKey: ["orders", sortOrder],
    queryFn: () => orderService.getOrders(sortOrder),
    staleTime: 1000 * 60 * 5,
  });
};
