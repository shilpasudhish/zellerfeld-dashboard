import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LockReason } from "../../../types/enums/LockReasonEnum";
import { OrderStatus } from "../../../types/enums/OrderStatusEnum";
import { ModelDesigner } from "../../../types/enums/ModelDesignerEnum";
import { OrderType } from "../../../types/enums/OrderTypeEnum";
import type { FilterState } from "../../../types/FilterState";
import { useEffect, useState } from "react";

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
  <div
    className={`flex flex-col items-start justify-start ${basis} min-w-[120px]`}
  >
    <div className="w-full">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
      <Button variant={"ghost"} onClick={onClear}>
        Clear
      </Button>
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
    <div className="w-full">
      <div className="h-32 overflow-y-auto w-full">
        <ToggleGroup
          className="grid"
          type={type}
          value={value}
          onValueChange={onValueChange}
        >
          {Object.keys(labelMap).map((key) => (
            <ToggleGroupItem key={key} value={key}>
              {labelMap[key]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex gap-2 mt-2">
        {selectAll && (
          <Button variant={"ghost"} onClick={selectAll}>
            Select All
          </Button>
        )}
        <Button variant={"ghost"} onClick={onClear}>
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
  const [daysSinceOrder, setDaysSinceOrder] = useState<string[]>(
    filterState.daysSinceOrder || []
  );

  useEffect(() => {
    updateFilterState({
      status,
      orderId,
      customer,
      type,
      lock,
      designer,
      model,
      daysSinceOrder,
    });
  }, [status, orderId, customer, type, lock, designer, model, daysSinceOrder]);

  const handleSearchChange = (setter: any) => (value: string) => setter(value);

  return (
    <div className="my-2">
      <div className="flex gap-x-2 px-4 min-w-[960px]">
        <FilterInput
          placeholder="Order ID"
          value={orderId}
          onChange={handleSearchChange(setOrderId)}
          onClear={() => setOrderId("")}
          basis="basis-[11.5%] min-w-[120px]"
        />
        <FilterToggleGroup
          value={status}
          onValueChange={setStatus}
          labelMap={orderStatusLabels}
          onClear={() => setStatus([])}
          selectAll={() =>
            setStatus(Object.keys(orderStatusLabels) as OrderStatus[])
          }
          basis="basis-[19.5%] min-w-[200px]"
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
          basis="basis-[11.5%] min-w-[120px]"
        />
        <FilterToggleGroup
          value={lock}
          onValueChange={setLock}
          labelMap={lockReasonLabels}
          onClear={() => setLock([])}
          selectAll={() =>
            setLock(Object.keys(lockReasonLabels) as LockReason[])
          }
          basis="basis-[11.5%] min-w-[120px]"
        />
        <FilterInput
          placeholder="Customer Name"
          value={customer}
          onChange={handleSearchChange(setCustomer)}
          onClear={() => setCustomer("")}
          basis="basis-[11.5%] min-w-[120px]"
        />
        <FilterToggleGroup
          value={daysSinceOrder}
          onValueChange={setDaysSinceOrder}
          labelMap={{ "5": "<5", "15": "<15", "30": "<30", "60": "<60" }}
          onClear={() => setDaysSinceOrder([])}
          selectAll={() =>
            setDaysSinceOrder(
              Object.keys({ "5": "<5", "15": "<15", "30": "<30", "60": "<60" })
            )
          }
          basis="basis-[11.5%] min-w-[120px]"
        />
        <FilterToggleGroup
          value={model}
          onValueChange={setModel}
          labelMap={designerLabels}
          onClear={() => setModel([])}
          selectAll={() =>
            setModel(Object.keys(designerLabels) as ModelDesigner[])
          }
          basis="basis-[11.5%] min-w-[120px]"
        />
        <FilterToggleGroup
          value={designer}
          onValueChange={setDesigner}
          labelMap={designerLabels}
          onClear={() => setDesigner([])}
          selectAll={() =>
            setDesigner(Object.keys(designerLabels) as ModelDesigner[])
          }
          basis="basis-[11.5%] min-w-[120px]"
        />
      </div>
    </div>
  );
};
export default FilterControl;
