import { useQuery } from "@tanstack/react-query";
import { Order } from "@/types/order";
import { SortState } from "@/types/SortState";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import OrderTable from "../components/OrderTable";
import SortControl from "./SortControl";
import { FilterState } from "../../../types/FilterState";
import FilterControl from "./FilterControl";
import "./OrderDashboard.module.css";
import orderService from "@/services/orderService";
const OrderDashboard = () => {
  const [sortOrder, setSortOrder] = useState<SortState>({
    field: "oid",
    direction: "asc",
  });
  const [filterOrder, setFilterOrder] = useState<FilterState>({
    orderId: "",
    status: [],
    type: [],
    lock: [],
    customer: "",
    designer: [],
    model: [],
    daysSinceOrder: [],
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos", sortOrder, filterOrder],
    queryFn: () => orderService.getOrders(sortOrder, filterOrder),
  });

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (isError)
    return (
      <div className="text-center p-4 text-red-500">Error loading orders</div>
    );

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full border-2 border-black rounded-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-max">
              <SortControl
                sortState={sortOrder}
                setSortState={(sortState: SortState) => setSortOrder(sortState)}
              />
              <FilterControl
                filterState={filterOrder}
                updateFilterState={(filterState: FilterState) =>
                  setFilterOrder(filterState)
                }
              />

              <OrderTable orders={data as Order[]} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default OrderDashboard;
