import { Button } from "@/components/ui/button";
import type { Order } from "@/types/order";
import type { SortState } from "@/types/SortState";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

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
    setSortOrder({ field: field, direction: dir });
    setSortState({ field: field, direction: dir });
  };

  return (
    <div className="columns flex gap-2">
      {/* Order ID */}
      <div className="header flex max-w-40">
        <span className="font-bold">Order ID</span>
      </div>
      {/* Status */}
      <div className="header flex max-w-40">
        <span className="font-bold">Status</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSort("status")}
        >
          {sortOrder.field === "status" && sortOrder.direction === "asc" ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
        </Button>
      </div>
      {/* Type */}
      <div className="header flex max-w-40">
        <span className="font-bold">Type</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSort("type")}
        >
          {sortOrder.field === "type" && sortOrder.direction === "asc" ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
        </Button>
      </div>
      {/* Lock */}
      <div className="header flex max-w-40">
        <span className="font-bold">Lock</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSort("lock")}
        >
          {sortOrder.field === "lock" && sortOrder.direction === "asc" ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
        </Button>
      </div>
      {/* Custoemr */}
      <div className="header flex max-w-40">
        <span className="font-bold">Customer </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSort("customer")}
        >
          {sortOrder.field === "customer" && sortOrder.direction === "asc" ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
        </Button>
      </div>
      {/* Days */}
      <div className="header flex max-w-40">
        <span className="font-bold">Days</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSort("daysSinceOrder")}
        >
          {sortOrder.field === "daysSinceOrder" &&
          sortOrder.direction === "asc" ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
        </Button>
      </div>
      {/* Model */}
      <div className="header flex max-w-40">
        <span className="font-bold">Model</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSort("model")}
        >
          {sortOrder.field === "model" && sortOrder.direction === "asc" ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
        </Button>
      </div>
      {/* Design */}
      <div className="header flex max-w-40">
        <span className="font-bold">Design</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSort("designer")}
        >
          {sortOrder.field === "designer" && sortOrder.direction === "asc" ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SortControl;
