import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LockReason } from "../../../types/enums/LockReasonEnum";
import { OrderStatus } from "../../../types/enums/OrderStatusEnum";
import { ModelDesigner } from "../../../types/enums/ModelDesignerEnum";
import { OrderType } from "../../../types/enums/OrderTypeEnum";
import { FilterState } from "../../../types/FilterState";
import { useEffect, useState } from "react";
import { columns } from "./SortControl";
import { cn } from "@/lib/utils";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";

type FilterControlProps = {
  filterState: FilterState;
  updateFilterState: (filterState: FilterState) => void;
};

// Utility functions to get enum labels
const orderStatusLabels = {
  [OrderStatus.Delivered]: "Delivered",
  [OrderStatus.ReadyForPackaging]: "Ready for Packaging",
  [OrderStatus.QC]: "QC",
  [OrderStatus.Drying]: "Drying",
  [OrderStatus.Printing]: "Printing",
  [OrderStatus.OpenOrder]: "Open Order",
};

const lockReasonLabels = {
  [LockReason.ModelNotReleased]: "Model not released",
  [LockReason.GCodeOutdated]: "G-Code outdated",
  [LockReason.AddressIssue]: "Address Issue",
  [LockReason.Seeding]: "Seeding",
};

const designerLabels = {
  [ModelDesigner.FinnRushTaylor]: "Finn Rush Taylor",
  [ModelDesigner.Lotus]: "Lotus",
  [ModelDesigner.Mabuia]: "Mabuia",
  [ModelDesigner.Neptune]: "Neptune",
  [ModelDesigner.Nami]: "Nami",
};

// Filter input component for search fields with clear button
const FilterInput = ({
  placeholder,
  value,
  onChange,
  onClear,
  basis = "basis-[11.5%]",
}: any) => (
  <div className={`flex flex-col ${basis} min-w-[120px]`}>
    <div className="flex flex-col w-full h-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border-0 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <div className="mt-auto flex justify-end px-3 py-2 bg-gray-50 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-sm px-3 py-1"
          onClick={onClear}
        >
          Clear Selection
        </Button>
      </div>
    </div>
  </div>
);

// Filter toggle group for different enum types (Order Status, Lock Reason, etc.)

const FilterToggleGroup = ({
  value,
  onValueChange,
  labelMap,
  onClear,
  selectAll,
  basis = "basis-[19.5%] min-w-[200px]",
  type = "multiple",
}: any) => (
  <div className={`flex flex-col items-start ${basis}`}>
    <div className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <div className="h-32 overflow-y-auto w-full pr-1">
        <ToggleGroup
          className="flex flex-col gap-[1px] w-full"
          type={type}
          value={value}
          onValueChange={onValueChange}
        >
          {Object.keys(labelMap).map((key) => (
            <ToggleGroupItem
              key={key}
              value={key}
              className={cn(
                "block w-full text-left px-3 py-2 text-sm font-normal border-b border-gray-200 last:border-b-0",
                "transition-colors duration-200 rounded-none",
                "data-[state=on]:bg-gray-300 data-[state=on]:text-gray-900",
                "data-[state=off]:bg-white data-[state=off]:hover:bg-gray-100"
              )}
            >
              {labelMap[key]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-gray-200 bg-gray-50">
        {selectAll ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-3 py-1 text-sm"
              onClick={selectAll}
            >
              Select all
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-3 py-1 text-sm"
              onClick={onClear}
            >
              Clear
            </Button>
          </>
        ) : (
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-3 py-1 text-sm"
              onClick={onClear}
            >
              Clear
            </Button>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Main filter control component managing multiple filters

const FilterControl = ({
  filterState,
  updateFilterState,
}: FilterControlProps) => {
  const [status, setStatus] = useState<OrderStatus[]>(filterState.status);
  const [orderId, setOrderId] = useState<string>(filterState.orderId);
  const [customer, setCustomer] = useState<string>(filterState.customer);
  const [type, setType] = useState<OrderType[]>(filterState.type);
  const [lock, setLock] = useState<LockReason[]>(filterState.lock);
  const [designer, setDesigner] = useState<ModelDesigner[]>(
    filterState.designer
  );
  const [model, setModel] = useState<ModelDesigner[]>(filterState.model);
  const [daysSinceOrder, setDaysSinceOrder] = useState<string>(
    filterState.daysSinceOrder
  );
  // Debounced search for orderId and customer

  const debouncedOrderId = useDebouncedSearch(orderId, 1000);
  const debouncedCustomer = useDebouncedSearch(customer, 1000);
  // Effect hook to update filter state whenever a filter changes

  useEffect(() => {
    updateFilterState({
      status,
      orderId: debouncedOrderId,
      customer: debouncedCustomer,
      type,
      lock,
      designer,
      model,
      daysSinceOrder,
    });
  }, [
    status,
    debouncedOrderId,
    debouncedCustomer,
    type,
    lock,
    designer,
    model,
    daysSinceOrder,
  ]);
  // Search input change handler

  const handleSearchChange = (setter: any) => (value: string) => setter(value);

  return (
    <div className="my-2 mb-10">
      <div className="flex gap-x-2 px-4">
        {/* Each FilterInput and FilterToggleGroup component */}
        <FilterInput
          placeholder="Order ID"
          value={orderId}
          onChange={handleSearchChange(setOrderId)}
          onClear={() => setOrderId("")}
          basis={columns[0].basis}
        />
        <FilterToggleGroup
          value={status}
          onValueChange={setStatus}
          labelMap={orderStatusLabels}
          onClear={() => setStatus([])}
          selectAll={() =>
            setStatus(Object.keys(orderStatusLabels) as OrderStatus[])
          }
          basis={columns[1].basis}
        />
        <FilterToggleGroup
          value={type}
          onValueChange={setType}
          labelMap={Object.keys(OrderType).reduce((acc, key) => {
            acc[key as keyof typeof OrderType] = key;
            return acc;
          }, {} as Record<OrderType, string>)}
          onClear={() => setType([])}
          selectAll={() => setType(Object.keys(OrderType) as OrderType[])}
          basis={columns[2].basis}
        />
        <FilterToggleGroup
          value={lock}
          onValueChange={setLock}
          labelMap={lockReasonLabels}
          onClear={() => setLock([])}
          selectAll={() =>
            setLock(Object.keys(lockReasonLabels) as LockReason[])
          }
          basis={columns[3].basis}
        />
        <FilterInput
          placeholder="Customer Name"
          value={customer}
          onChange={handleSearchChange(setCustomer)}
          onClear={() => setCustomer("")}
          basis={columns[4].basis}
        />
        <FilterToggleGroup
          value={daysSinceOrder}
          onValueChange={setDaysSinceOrder}
          labelMap={{ "5": "<5", "15": "<15", "30": "<30", "60": "<60" }}
          onClear={() => setDaysSinceOrder("")}
          // selectAll={() =>
          //   setDaysSinceOrder(
          //     Object.keys({ "5": "<5", "15": "<15", "30": "<30", "60": "<60" })
          //   )
          // }
          basis={columns[5].basis}
          type="single"
        />
        <FilterToggleGroup
          value={model}
          onValueChange={setModel}
          labelMap={designerLabels}
          onClear={() => setModel([])}
          selectAll={() =>
            setModel(Object.keys(designerLabels) as ModelDesigner[])
          }
          basis={columns[6].basis}
        />
        <FilterToggleGroup
          value={designer}
          onValueChange={setDesigner}
          labelMap={designerLabels}
          onClear={() => setDesigner([])}
          selectAll={() =>
            setDesigner(Object.keys(designerLabels) as ModelDesigner[])
          }
          basis={columns[7].basis}
        />
      </div>
    </div>
  );
};

export default FilterControl;
