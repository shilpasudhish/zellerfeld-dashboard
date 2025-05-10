import { useOrders } from "../hooks/useOrders";
import type { SortState } from "@/types/SortState";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import OrderTable from "../components/OrderTable";
import SortControl from "./SortControl";

const OrderDashboard = () => {
  const [sortOrder, setSortOrder] = useState<SortState>({
    field: "oid",
    direction: "asc",
  });

  const { data: orders, isLoading, isError } = useOrders(sortOrder);
  console.log("Fetched orders:", orders);

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (isError)
    return (
      <div className="text-center p-4 text-red-500">Error loading orders</div>
    );

  return (
    <div className="container mx-auto p-4 ">
      <Card className="w-full border-2 border-black rounded-md">
        <CardContent>
          <SortControl sortState={sortOrder} setSortState={setSortOrder} />
          <OrderTable orders={orders ?? []} />
        </CardContent>
      </Card>
    </div>
  );
};
export default OrderDashboard;
