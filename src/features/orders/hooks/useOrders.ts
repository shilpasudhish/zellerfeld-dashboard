import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/services/orderService";
import type { Order } from "@/types/order";
import type { SortState } from "@/types/SortState";
import type { FilterState } from "@/types/FilterState";
export const useOrders = (sortOrder: SortState, filterState: FilterState) => {
  return useQuery<Order[]>({
    queryKey: ["orders", sortOrder, filterState],
    queryFn: () => orderService.getOrders(sortOrder, filterState),
    staleTime: 1000 * 60 * 5,
  });
};
