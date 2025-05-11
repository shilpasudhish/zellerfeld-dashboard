import { cn } from "@/lib/utils";
import { Order } from "@/types/order";
import { OrderStatus } from "@/types/enums/OrderStatusEnum";
import { LockReason } from "@/types/enums/LockReasonEnum";
import { ModelDesigner } from "@/types/enums/ModelDesignerEnum";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { columns } from "./SortControl"; // Import columns from SortControl

interface OrderTableProps {
  orders: Order[];
}

const getOrderStatusLabel = (status: OrderStatus | "" | undefined): string => {
  switch (status) {
    case OrderStatus.Delivered:
      return "Delivered";
    case OrderStatus.ReadyForPackaging:
      return "Ready for Packaging";
    case OrderStatus.QC:
      return "QC";
    case OrderStatus.Drying:
      return "Drying";
    case OrderStatus.Printing:
      return "Printing";
    case OrderStatus.OpenOrder:
      return "Open Order";
    default:
      return "";
  }
};

const getLockReasonLabel = (
  lock: LockReason | null | "" | undefined
): string => {
  switch (lock) {
    case LockReason.ModelNotReleased:
      return "Model not released";
    case LockReason.GCodeOutdated:
      return "G-Code outdated";
    case LockReason.AddressIssue:
      return "Address Issue";
    case LockReason.Seeding:
      return "Seeding";
    default:
      return "None";
  }
};

const getDesignerLabel = (designer?: ModelDesigner): string => {
  switch (designer) {
    case ModelDesigner.FinnRushTaylor:
      return "Finn Rush Taylor";
    case ModelDesigner.Lotus:
      return "Lotus";
    case ModelDesigner.Mabuia:
      return "Mabuia";
    case ModelDesigner.Neptune:
      return "Neptune";
    case ModelDesigner.Nami:
      return "Nami";
    default:
      return "";
  }
};

const renderCellContent = (order: Order, columnField: string) => {
  switch (columnField) {
    case "oid":
      return order.oid;
    case "status":
      return (
        <div className="h-12 bg-gray-100 shadow-sm flex overflow-hidden text-[11px] sm:text-sm">
          <div className="w-[35%] flex items-center justify-center p-1 sm:p-2 text-center border-r border-white">
            <div className="text-[11px] sm:text-sm leading-tight break-words whitespace-normal">
              {getOrderStatusLabel(order.status)}
            </div>
          </div>
          <div className="w-[65%] flex flex-col justify-between divide-y divide-white">
            <div className="flex h-1/2">
              <div className="flex-1 min-w-0 flex items-center px-1 sm:px-2">
                <span className="text-[11px] sm:text-sm break-words leading-tight line-clamp-2">
                  {getOrderStatusLabel(order.statusLeft)}
                </span>
              </div>
              <div className="w-5 flex-shrink-0 flex items-center justify-center border-l border-white">
                <span className="text-[10px] text-gray-600">L</span>
              </div>
            </div>
            <div className="flex h-1/2">
              <div className="flex-1 min-w-0 flex items-center px-1 sm:px-2">
                <span className="text-[11px] sm:text-sm break-words leading-tight line-clamp-2">
                  {getOrderStatusLabel(order.statusRight)}
                </span>
              </div>
              <div className="w-5 flex-shrink-0 flex items-center justify-center border-l border-white">
                <span className="text-[10px] text-gray-600">R</span>
              </div>
            </div>
          </div>
        </div>
      );
    case "type":
      return order.type;
    case "lock":
      return getLockReasonLabel(order.lock);
    case "customer":
      return order.customer;
    case "daysSinceOrder":
      return order.daysSinceOrder;
    case "model":
      return getDesignerLabel(order.model);
    case "designer":
      return getDesignerLabel(order.designer);
    default:
      return "";
  }
};

const OrderTable = ({ orders }: OrderTableProps) => {
  const [expandedOid, setExpandedOid] = useState<string | null>(null);

  const handleToggle = (oid: string) => {
    setExpandedOid((prev) => (prev === oid ? null : oid));
  };

  return (
    <Table className="w-full">
      <TableBody>
        {orders.map((order) => {
          const isExpanded = expandedOid === String(order.oid);

          return (
            <TableRow
              key={order.oid}
              className="flex gap-x-2 px-4 border-t border-b border-gray-400"
            >
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  className={cn(
                    `bg-white px-2 py-1 sm:py-2 ${column.basis}`,
                    column.field === "oid" && isExpanded && "bg-blue-200"
                  )}
                >
                  {column.field === "status" ? (
                    renderCellContent(order, column.field)
                  ) : column.field === "oid" ? (
                    <div
                      className={cn(
                        "h-12 shadow-sm flex items-center justify-between p-2 text-sm sm:text-base",
                        isExpanded && "bg-blue-200"
                      )}
                    >
                      <span className="font-semibold text-lg">{order.oid}</span>
                      <button
                        onClick={() => handleToggle(String(order.oid))}
                        className="ml-2 text-gray-600 hover:text-black"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="h-12 bg-gray-100 shadow-sm flex items-center justify-center p-2 text-center text-[11px] sm:text-sm">
                      <div
                        className={cn(
                          "text-[11px] sm:text-sm break-words leading-tight",
                          ["oid", "type", "daysSinceOrder"].includes(
                            column.field
                          )
                            ? "font-semibold text-lg sm:text-lg"
                            : ""
                        )}
                      >
                        {renderCellContent(order, column.field)}
                      </div>
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

OrderTable.displayName = "OrderTable";

export default OrderTable;
