import { useOrders } from "../hooks/useOrders";
import { Card, CardContent } from "@/components/ui/card";
import OrderTable from "../components/OrderTable";

const OrderDashboard = () => {
  const { data: orders, isLoading, isError } = useOrders();
  console.log("Fetched orders:", orders);

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (isError)
    return (
      <div className="text-center p-4 text-red-500">Error loading orders</div>
    );

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardContent>
          <OrderTable orders={orders ?? []} />
        </CardContent>
      </Card>
    </div>
  );
};
export default OrderDashboard;
