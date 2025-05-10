import { Button } from "@/components/ui/button";
import type { Order } from "@/types/order";
import type { SortState } from "@/types/SortState";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

// Define each column with its label and field key
const columns: { label: string; field: keyof Order; basis: string }[] = [
  { label: "OID", field: "oid", basis: "basis-[11.5%] min-w-[120px]" },
  { label: "Status", field: "status", basis: "basis-[19.5%] min-w-[200px]" },
  { label: "Type", field: "type", basis: "basis-[11.5%] min-w-[120px]" },
  { label: "Lock", field: "lock", basis: "basis-[11.5%] min-w-[120px]" },
  {
    label: "Customer",
    field: "customer",
    basis: "basis-[11.5%] min-w-[120px]",
  },
  {
    label: "Days since order",
    field: "daysSinceOrder",
    basis: "basis-[11.5%] min-w-[120px]",
  },
  { label: "Model", field: "model", basis: "basis-[11.5%] min-w-[120px]" },
  {
    label: "Designer",
    field: "designer",
    basis: "basis-[11.5%] min-w-[120px]",
  },
];

type SortControlProps = {
  sortState: SortState;
  setSortState: (sortState: SortState) => void;
};

const SortControl = ({ sortState, setSortState }: SortControlProps) => {
  const [sortOrder, setSortOrder] = useState<SortState>(sortState);

  const handleSort = (field: keyof Order) => {
    let dir: "asc" | "desc" = "asc";
    if (sortState.field === field) {
      dir = sortState.direction === "asc" ? "desc" : "asc";
    }
    const newSort = { field, direction: dir };
    setSortOrder(newSort);
    setSortState(newSort);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-x-2 px-4 min-w-max">
        {columns.map(({ label, field, basis }) => {
          const isActive = sortOrder.field === field;
          return (
            <div
              key={field}
              className={`flex items-center justify-between text-white font-bold text-[15px] text-center bg-black shadow-sm border border-gray-700 py-2 rounded-md px-2 ${basis}`}
            >
              <span className="mr-1">{label}</span>
              <Button
                variant="secondary"
                size="icon"
                className={`h-8 w-8 p-0 text-black ${
                  isActive ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => handleSort(field)}
              >
                {isActive && sortOrder.direction === "asc" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SortControl;
