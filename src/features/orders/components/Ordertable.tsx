import { useOrders } from "../hooks/useOrders";

export const OrderTable = () => {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) return <div className="p-4">Loading orders...</div>;
  if (error)
    return <div className="p-4 text-red-500">Failed to load orders</div>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-collapse border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">OID</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Type</th>
            <th className="border px-4 py-2 text-left">Lock</th>
            <th className="border px-4 py-2 text-left">Customer</th>
            <th className="border px-4 py-2 text-left">Days</th>
            <th className="border px-4 py-2 text-left">Model</th>
            <th className="border px-4 py-2 text-left">Designer</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.oid} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{order.oid}</td>
              <td className="border px-4 py-2">
                {order.statusLeft} / {order.statusRight}
              </td>
              <td className="border px-4 py-2">{order.type}</td>
              <td className="border px-4 py-2">{order.lock || "-"}</td>
              <td className="border px-4 py-2">{order.customer}</td>
              <td className="border px-4 py-2">{order.daysSinceOrder}</td>
              <td className="border px-4 py-2">{order.model}</td>
              <td className="border px-4 py-2">{order.designer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
