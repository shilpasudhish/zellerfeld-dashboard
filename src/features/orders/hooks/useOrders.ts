import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/services/orderService";
import type { Order } from "@/types/order";

export const useOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: () => orderService.getOrders(),
    staleTime: 1000 * 60 * 5,
  });
};
