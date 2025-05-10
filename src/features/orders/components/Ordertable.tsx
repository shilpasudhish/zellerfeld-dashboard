import { memo } from "react";
import { Order } from "@/types/order";
import {
  Table,
  TableBody,
  TableCell,
  // TableHead,
  // TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderTableProps {
  orders: Order[];
}

const OrderTable = memo(({ orders }: OrderTableProps) => {
  // const columns = [
  //   { key: "oid", label: "Order ID" },
  //   { key: "status", label: "Status" },
  //   { key: "type", label: "Type" },
  //   { key: "lock", label: "Lock" },
  //   { key: "customer", label: "Customer" },
  //   { key: "daysSinceOrder", label: "Days since order" },
  //   { key: "model", label: "Model" },
  //   { key: "designer", label: "Designer" },
  // ];

  return (
    <Table className="w-full">
      {/* <TableHeader>
        <TableRow className="bg-gray-200">
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className="px-4 py-2 text-left font-medium"
            >
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader> */}
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.oid} className="border-b hover:bg-gray-100">
            <TableCell className="px-4 py-2 bg-white">
              <div className="h-12 bg-gray-100 shadow-sm flex items-center justify-center p-2">
                <div className="text-lg font-medium text-center leading-tight break-words">
                  {order.oid}
                </div>
              </div>
            </TableCell>

            <TableCell className="px-4 py-2 bg-white">
              <div className="h-12 bg-gray-100 shadow-sm flex overflow-hidden">
                <div className="w-[35%] flex items-center justify-center p-2 text-center border-r border-white">
                  <div className="text-sm  leading-tight break-words whitespace-normal">
                    {order.status}
                  </div>
                </div>

                <div className="w-[65%] flex flex-col divide-y divide-white">
                  <div className="flex h-1/2">
                    <div className="flex-1 flex items-center px-2 w-[90%]">
                      <span className="text-sm break-words leading-tight">
                        {order.statusLeft}
                      </span>
                    </div>
                    <div className="w-[10%] flex items-center justify-center border-l border-white">
                      <span className="text-xs text-gray-600">L</span>
                    </div>
                  </div>

                  <div className="flex h-1/2">
                    <div className="flex-1 flex items-center px-2 w-[90%]">
                      <span className="text-sm break-words leading-tight">
                        {order.statusRight}
                      </span>
                    </div>
                    <div className="w-[10%] flex items-center justify-center border-l border-white">
                      <span className="text-xs text-gray-600">R</span>
                    </div>
                  </div>
                </div>
              </div>
            </TableCell>

            <TableCell className="px-4 py-2 bg-white">
              <div className="h-12 bg-gray-100 shadow-sm flex items-center justify-center p-2">
                <div className="text-lg font-medium text-center leading-tight break-words">
                  {order.type}
                </div>
              </div>
            </TableCell>

            <TableCell className="px-4 py-2 bg-white">
              <div className="h-12 bg-gray-100 shadow-sm flex items-center justify-center p-2 text-center">
                <div className="text-sm break-words whitespace-normal leading-tight">
                  {order.lock || "None"}
                </div>
              </div>
            </TableCell>
            <TableCell className="px-4 py-2 bg-white">
              <div className="h-12 bg-gray-100 shadow-sm flex items-center justify-center p-2 text-center">
                <div className="text-sm break-words whitespace-normal leading-tight">
                  {order.customer}
                </div>
              </div>
            </TableCell>
            <TableCell className="px-4 py-2 bg-white">
              <div className="h-12 bg-gray-100 shadow-sm flex items-center justify-center p-2 text-center">
                <div className="text-lg font-medium break-words whitespace-normal leading-tight">
                  {order.daysSinceOrder}
                </div>
              </div>
            </TableCell>
            <TableCell className="px-4 py-2 bg-white">
              <div className="h-12 bg-gray-100 shadow-sm flex items-center justify-center p-2 text-center">
                <div className="text-sm break-words whitespace-normal leading-tight">
                  {order.model}
                </div>
              </div>
            </TableCell>
            <TableCell className="px-4 py-2 bg-white">
              <div className="h-12 bg-gray-100 shadow-sm flex items-center justify-center p-2 text-center">
                <div className="text-sm break-words whitespace-normal leading-tight">
                  {order.designer}
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

OrderTable.displayName = "OrderTable";

export default OrderTable;
