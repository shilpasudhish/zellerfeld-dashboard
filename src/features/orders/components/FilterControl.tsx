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

const FilterInput = ({
  placeholder,
  value,
  onChange,
  onClear,
  basis = "basis-[11.5%]",
}: any) => (
  <div className={`flex flex-col ${basis} min-w-[120px]`}>
    <div className="w-full h-full border border-gray-500 rounded-md flex flex-col">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border-0 border-b border-gray-500 rounded-none focus:outline-none focus:ring-0 focus-visible:ring-0"
      />
      <div className="mt-auto flex justify-end p-4">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full px-3 py-1 text-sm"
          onClick={onClear}
        >
          Clear
        </Button>
      </div>
    </div>
  </div>
);

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
    <div className="w-full border border-gray-500 rounded-md">
      <div className="h-32 overflow-y-auto w-full pr-1">
        <ToggleGroup
          className="flex flex-col gap-1 w-[calc(100%-4px)] pr-1 pl-1"
          type={type}
          value={value}
          onValueChange={onValueChange}
        >
          {Object.keys(labelMap).map((key) => (
            <ToggleGroupItem
              key={key}
              value={key}
              className={cn(
                "block w-full text-left p-2 text-sm font-normal border-b border-gray-500 last:border-b-0 first:rounded-none last:rounded-none transition-colors duration-200 data-[state=on]:bg-blue-200 data-[state=on]:text-blue-900 data-[state=off]:bg-white data-[state=off]:hover:bg-gray-100"
              )}
            >
              {labelMap[key]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex justify-between mt-2 px-2 py-4 gap-2">
        {selectAll && (
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full px-3 py-1 text-sm"
            onClick={selectAll}
          >
            Select All
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full px-3 py-1 text-sm"
          onClick={onClear}
        >
          Clear
        </Button>
      </div>
    </div>
  </div>
);

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
  const debouncedOrderId = useDebouncedSearch(orderId, 500);
  const debouncedCustomer = useDebouncedSearch(customer, 500);

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

  const handleSearchChange = (setter: any) => (value: string) => setter(value);

  return (
    <div className="my-2 mb-10">
      <div className="flex gap-x-2 px-4">
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
