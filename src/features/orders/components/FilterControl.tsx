// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import { LockReason } from "../../../types/enums/LockReasonEnum";
// import { OrderStatus } from "../../../types/enums/OrderStatusEnum";
// import { ModelDesigner } from "../../../types/enums/ModelDesignerEnum";
// import { OrderType } from "../../../types/enums/OrderTypeEnum";
// import type { FilterState } from "../../../types/FilterState";
// import { useEffect, useState } from "react";

// type FilterControlProps = {
//   filterState: FilterState;
//   updateFilterState: (filterState: FilterState) => void;
// };

// const columns: { field: keyof FilterState; basis: string }[] = [
//   { field: "orderId", basis: "basis-[11.5%] min-w-[120px]" },
//   { field: "status", basis: "basis-[19.5%] min-w-[200px]" },
//   { field: "type", basis: "basis-[11.5%] min-w-[120px]" },
//   { field: "lock", basis: "basis-[11.5%] min-w-[120px]" },
//   { field: "customer", basis: "basis-[11.5%] min-w-[120px]" },
//   { field: "daysSinceOrder", basis: "basis-[11.5%] min-w-[120px]" },
//   { field: "model", basis: "basis-[11.5%] min-w-[120px]" },
//   { field: "designer", basis: "basis-[11.5%] min-w-[120px]" },
// ];
// const FilterControl = ({
//   filterState,
//   updateFilterState,
// }: FilterControlProps) => {
//   const [status, setStatus] = useState<OrderStatus[]>(filterState.status);
//   const [orderId, setOrderId] = useState<string>(filterState.orderId);
//   const [customer, setCustomer] = useState<string>(filterState.customer);
//   const [type, setType] = useState<OrderType[]>(filterState.type);
//   const [lock, setLock] = useState<LockReason[]>(filterState.lock);
//   const [designer, setDesigner] = useState<ModelDesigner[]>(
//     filterState.designer
//   );
//   const [model, setModel] = useState<ModelDesigner[]>(filterState.model);
//   const [daysSinceOrder, setDaysSinceOrder] = useState<string>(
//     filterState.daysSinceOrder
//   );

//   useEffect(() => {
//     updateFilterState({
//       status,
//       orderId,
//       customer,
//       type,
//       lock,
//       designer,
//       model,
//       daysSinceOrder,
//     });
//   }, [status, orderId, customer, type, lock, designer, model, daysSinceOrder]);

//   const handleOrderSearch = (e: string) => {
//     setOrderId(e);
//   };

//   const handleCustomerSearch = (e: string) => {
//     setCustomer(e);
//   };

//   const getOrderStatus = (status: OrderStatus) => {
//     switch (status) {
//       case OrderStatus.Delivered:
//         return "Delivered";
//       case OrderStatus.ReadyForPackaging:
//         return "Ready for Packaging";
//       case OrderStatus.QC:
//         return "QC";
//       case OrderStatus.Drying:
//         return "Drying";
//       case OrderStatus.Printing:
//         return "Printing";
//       case OrderStatus.OpenOrder:
//         return "Open Order";
//       default:
//         return "";
//     }
//   };

//   const getLockReason = (lock: LockReason) => {
//     switch (lock) {
//       case LockReason.ModelNotReleased:
//         return "Model not released";
//       case LockReason.GCodeOutdated:
//         return "G-Code outdated";
//       case LockReason.AddressIssue:
//         return "Address Issue";
//       case LockReason.Seeding:
//         return "Seeding";
//       default:
//         return "None";
//     }
//   };

//   const getDesignerName = (design: ModelDesigner) => {
//     switch (design) {
//       case ModelDesigner.FinnRushTaylor:
//         return "Finn Rush Taylor";
//       case ModelDesigner.Lotus:
//         return "Lotus";
//       case ModelDesigner.Mabuia:
//         return "Mabuia";
//       case ModelDesigner.Neptune:
//         return "Neptune";
//       case ModelDesigner.Nami:
//         return "Nami";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="flex flex-wrap gap-x-2 px-4 my-2">
//       <div className="flex gap-x-2 px-4 min-w-max">
//         {/* order ID */}
//         <div
//           className={`flex flex-col items-start justify-start ${columns[0].basis}`}
//         >
//           <Input
//             placeholder="Order ID"
//             className="min-w-[90px] w-[14ch] max-w-[18ch]"
//             value={orderId}
//             onChange={(e) => handleOrderSearch(e.target.value)}
//           />
//           <Button variant={"ghost"} onClick={() => setOrderId("")}>
//             Clear
//           </Button>
//         </div>
//         {/* status */}
//         <div className={`flex flex-col items-start ${columns[1].basis}`}>
//           <div className="h-32 overflow-y-auto w-full">
//             <ToggleGroup
//               className="grid gap-1"
//               type="multiple"
//               value={status}
//               onValueChange={(status: OrderStatus[]) => setStatus(status)}
//             >
//               {Object.keys(OrderStatus).map((status) => (
//                 <ToggleGroupItem key={status} value={status}>
//                   {getOrderStatus(status as OrderStatus)}
//                 </ToggleGroupItem>
//               ))}
//             </ToggleGroup>
//           </div>
//           <div className="flex gap-2 mt-2">
//             <Button
//               variant={"ghost"}
//               onClick={() =>
//                 setStatus(Object.keys(OrderStatus) as OrderStatus[])
//               }
//             >
//               Select All
//             </Button>
//             <Button variant={"ghost"} onClick={() => setStatus([])}>
//               Clear
//             </Button>
//           </div>
//         </div>
//         {/* type */}
//         <div className={`flex flex-col items-start ${columns[2].basis}`}>
//           <div className="h-32 overflow-y-auto w-full">
//             <ToggleGroup
//               className="grid gap-1"
//               type="multiple"
//               value={type}
//               onValueChange={(type: OrderType[]) => setType(type)}
//             >
//               {Object.keys(OrderType).map((type) => (
//                 <ToggleGroupItem key={type} value={type}>
//                   {type}
//                 </ToggleGroupItem>
//               ))}
//             </ToggleGroup>
//           </div>
//           <div className="flex gap-2 mt-2">
//             <Button
//               variant={"ghost"}
//               onClick={() => setType(Object.keys(OrderType) as OrderType[])}
//             >
//               Select All
//             </Button>
//             <Button variant={"ghost"} onClick={() => setType([])}>
//               Clear
//             </Button>
//           </div>
//         </div>
//         {/* lock */}
//         <div className={`flex flex-col items-start ${columns[3].basis}`}>
//           <div className="h-32 overflow-y-auto w-full">
//             <ToggleGroup
//               className="grid gap-1"
//               type="multiple"
//               value={lock}
//               onValueChange={(lock: LockReason[]) => setLock(lock)}
//             >
//               {Object.keys(LockReason).map((lock) => (
//                 <ToggleGroupItem key={lock} value={lock}>
//                   {getLockReason(lock as LockReason)}
//                 </ToggleGroupItem>
//               ))}
//             </ToggleGroup>
//           </div>
//           <div className="flex gap-2 mt-2">
//             <Button
//               variant={"ghost"}
//               onClick={() => setLock(Object.keys(LockReason) as LockReason[])}
//             >
//               Select All
//             </Button>
//             <Button variant={"ghost"} onClick={() => setLock([])}>
//               Clear
//             </Button>
//           </div>
//         </div>
//         {/* customer*/}
//         <div className={`flex flex-col items-start ${columns[4].basis}`}>
//           <Input
//             placeholder="Customer Name"
//             className="min-w-[90px] w-[14ch] max-w-[18ch]"
//             value={customer}
//             onChange={(e) => handleCustomerSearch(e.target.value)}
//           />
//           <Button variant={"ghost"} onClick={() => setCustomer("")}>
//             Clear
//           </Button>
//         </div>
//         {/* days */}
//         <div className={`flex flex-col items-start ${columns[5].basis}`}>
//           <div className="h-32 overflow-y-auto w-full">
//             <ToggleGroup
//               className="grid gap-1"
//               type="single"
//               value={daysSinceOrder}
//               onValueChange={(days: string) => setDaysSinceOrder(days)}
//             >
//               <ToggleGroupItem value={"5"}>{"<5"}</ToggleGroupItem>
//               <ToggleGroupItem value={"15"}>{"<15"}</ToggleGroupItem>
//               <ToggleGroupItem value={"30"}>{"<30"}</ToggleGroupItem>
//               <ToggleGroupItem value={"60"}>{"<60"}</ToggleGroupItem>
//             </ToggleGroup>
//           </div>
//           <div className="flex gap-2 mt-2">
//             <Button variant={"ghost"} onClick={() => setDaysSinceOrder("")}>
//               Clear
//             </Button>
//           </div>
//         </div>

//         {/* model */}
//         <div className={`flex flex-col items-start ${columns[6].basis}`}>
//           <div className="h-32 overflow-y-auto w-full">
//             <ToggleGroup
//               className="grid gap-1"
//               type="multiple"
//               value={model}
//               onValueChange={(mod: ModelDesigner[]) => setModel(mod)}
//             >
//               {Object.keys(ModelDesigner).map((mod) => (
//                 <ToggleGroupItem key={mod} value={mod}>
//                   {getDesignerName(mod as ModelDesigner)}
//                 </ToggleGroupItem>
//               ))}
//             </ToggleGroup>
//           </div>
//           <div className="flex gap-2 mt-2">
//             <Button
//               variant={"ghost"}
//               onClick={() =>
//                 setModel(Object.keys(ModelDesigner) as ModelDesigner[])
//               }
//             >
//               Select All
//             </Button>
//             <Button variant={"ghost"} onClick={() => setModel([])}>
//               Clear
//             </Button>
//           </div>
//         </div>
//         {/* Design */}
//         <div className={`flex flex-col items-start ${columns[7].basis}`}>
//           <div className="h-32 overflow-y-auto w-full">
//             <ToggleGroup
//               className="grid gap-1"
//               type="multiple"
//               value={designer}
//               onValueChange={(design: ModelDesigner[]) => setDesigner(design)}
//             >
//               {Object.keys(ModelDesigner).map((design) => (
//                 <ToggleGroupItem key={design} value={design}>
//                   {getDesignerName(design as ModelDesigner)}
//                 </ToggleGroupItem>
//               ))}
//             </ToggleGroup>
//           </div>
//           <div className="flex gap-2 mt-2">
//             <Button
//               variant={"ghost"}
//               onClick={() =>
//                 setDesigner(Object.keys(ModelDesigner) as ModelDesigner[])
//               }
//             >
//               Select All
//             </Button>
//             <Button variant={"ghost"} onClick={() => setDesigner([])}>
//               Clear
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterControl;

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import { LockReason } from "../../../types/enums/LockReasonEnum";
// import { OrderStatus } from "../../../types/enums/OrderStatusEnum";
// import { ModelDesigner } from "../../../types/enums/ModelDesignerEnum";
// import { OrderType } from "../../../types/enums/OrderTypeEnum";
// import type { FilterState } from "../../../types/FilterState";
// import { useEffect, useState } from "react";

// type FilterControlProps = {
//   filterState: FilterState;
//   updateFilterState: (filterState: FilterState) => void;
// };

// // Utility functions to get enum labels
// const getEnumLabel = <T extends string | number>(
//   enumObj: Record<T, string>,
//   key: T
// ) => enumObj[key] || "";

// const orderStatusLabels = {
//   [OrderStatus.Delivered]: "Delivered",
//   [OrderStatus.ReadyForPackaging]: "Ready for Packaging",
//   [OrderStatus.QC]: "QC",
//   [OrderStatus.Drying]: "Drying",
//   [OrderStatus.Printing]: "Printing",
//   [OrderStatus.OpenOrder]: "Open Order",
// };

// const lockReasonLabels = {
//   [LockReason.ModelNotReleased]: "Model not released",
//   [LockReason.GCodeOutdated]: "G-Code outdated",
//   [LockReason.AddressIssue]: "Address Issue",
//   [LockReason.Seeding]: "Seeding",
// };

// const designerLabels = {
//   [ModelDesigner.FinnRushTaylor]: "Finn Rush Taylor",
//   [ModelDesigner.Lotus]: "Lotus",
//   [ModelDesigner.Mabuia]: "Mabuia",
//   [ModelDesigner.Neptune]: "Neptune",
//   [ModelDesigner.Nami]: "Nami",
// };

// const FilterInput = ({
//   placeholder,
//   value,
//   onChange,
//   onClear,
//   basis = "basis-[11.5%]",
// }: any) => (
//   <div
//     className={`flex flex-col items-start justify-start ${basis} min-w-[120px]`}
//   >
//     <Input
//       placeholder={placeholder}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//     />
//     <Button variant={"ghost"} onClick={onClear}>
//       Clear
//     </Button>
//   </div>
// );

// const FilterToggleGroup = ({
//   value,
//   onValueChange,
//   labelMap,
//   onClear,
//   selectAll,
//   basis = "basis-[19.5%] min-w-[200px]",
// }: any) => (
//   <div className={`flex flex-col items-start ${basis}`}>
//     <div className="h-32 overflow-y-auto w-full">
//       <ToggleGroup
//         className="grid"
//         type="multiple"
//         value={value}
//         onValueChange={onValueChange}
//       >
//         {Object.keys(labelMap).map((key) => (
//           <ToggleGroupItem key={key} value={key}>
//             {labelMap[key]}
//           </ToggleGroupItem>
//         ))}
//       </ToggleGroup>
//     </div>
//     <div className="flex gap-2 mt-2">
//       <Button variant={"ghost"} onClick={selectAll}>
//         Select All
//       </Button>
//       <Button variant={"ghost"} onClick={onClear}>
//         Clear
//       </Button>
//     </div>
//   </div>
// );

// const FilterControl = ({
//   filterState,
//   updateFilterState,
// }: FilterControlProps) => {
//   const [status, setStatus] = useState<OrderStatus[]>(filterState.status);
//   const [orderId, setOrderId] = useState<string>(filterState.orderId);
//   const [customer, setCustomer] = useState<string>(filterState.customer);
//   const [type, setType] = useState<OrderType[]>(filterState.type);
//   const [lock, setLock] = useState<LockReason[]>(filterState.lock);
//   const [designer, setDesigner] = useState<ModelDesigner[]>(
//     filterState.designer
//   );
//   const [model, setModel] = useState<ModelDesigner[]>(filterState.model);
//   const [daysSinceOrder, setDaysSinceOrder] = useState<string>(
//     filterState.daysSinceOrder
//   );

//   useEffect(() => {
//     updateFilterState({
//       status,
//       orderId,
//       customer,
//       type,
//       lock,
//       designer,
//       model,
//       daysSinceOrder,
//     });
//   }, [status, orderId, customer, type, lock, designer, model, daysSinceOrder]);

//   const handleSearchChange = (setter: any) => (value: string) => setter(value);

//   return (
//     <div className="overflow-x-auto my-2">
//       <div className="flex gap-x-2 px-4 min-w-max">
//         <FilterInput
//           placeholder="Order ID"
//           value={orderId}
//           onChange={handleSearchChange(setOrderId)}
//           onClear={() => setOrderId("")}
//           basis="basis-[11.5%] min-w-[120px]" // Align with sort column's width
//         />
//         <FilterToggleGroup
//           value={status}
//           onValueChange={setStatus}
//           labelMap={orderStatusLabels}
//           onClear={() => setStatus([])}
//           selectAll={() =>
//             setStatus(Object.keys(orderStatusLabels) as OrderStatus[])
//           }
//           basis="basis-[19.5%] min-w-[200px]" // Align with sort column's width
//         />
//         <FilterToggleGroup
//           value={type}
//           onValueChange={setType}
//           labelMap={Object.keys(OrderType).reduce((acc, key) => {
//             acc[key as keyof typeof OrderType] = key;
//             return acc;
//           }, {} as Record<OrderType, string>)}
//           onClear={() => setType([])}
//           selectAll={() => setType(Object.keys(OrderType) as OrderType[])}
//           basis="basis-[11.5%] min-w-[120px]" // Align with sort column's width
//         />
//         <FilterToggleGroup
//           value={lock}
//           onValueChange={setLock}
//           labelMap={lockReasonLabels}
//           onClear={() => setLock([])}
//           selectAll={() =>
//             setLock(Object.keys(lockReasonLabels) as LockReason[])
//           }
//           basis="basis-[11.5%] min-w-[120px]" // Align with sort column's width
//         />
//         <FilterInput
//           placeholder="Customer Name"
//           value={customer}
//           onChange={handleSearchChange(setCustomer)}
//           onClear={() => setCustomer("")}
//           basis="basis-[11.5%] min-w-[120px]" // Align with sort column's width
//         />
//         <FilterToggleGroup
//           value={[daysSinceOrder]}
//           onValueChange={(value: string[]) => setDaysSinceOrder(value[0] || "")}
//           labelMap={{ "5": "<5", "15": "<15", "30": "<30", "60": "<60" }}
//           onClear={() => setDaysSinceOrder("")}
//           selectAll={() => setDaysSinceOrder("5")}
//           basis="basis-[11.5%] min-w-[120px]" // Align with sort column's width
//         />
//         <FilterToggleGroup
//           value={model}
//           onValueChange={setModel}
//           labelMap={designerLabels}
//           onClear={() => setModel([])}
//           selectAll={() =>
//             setModel(Object.keys(designerLabels) as ModelDesigner[])
//           }
//           basis="basis-[11.5%] min-w-[120px]" // Align with sort column's width
//         />
//         <FilterToggleGroup
//           value={designer}
//           onValueChange={setDesigner}
//           labelMap={designerLabels}
//           onClear={() => setDesigner([])}
//           selectAll={() =>
//             setDesigner(Object.keys(designerLabels) as ModelDesigner[])
//           }
//           basis="basis-[11.5%] min-w-[120px]" // Align with sort column's width
//         />
//       </div>
//     </div>
//   );
// };

// export default FilterControl;

// src/components/FilterControl.tsx
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
const getEnumLabel = <T extends string | number>(
  enumObj: Record<T, string>,
  key: T
) => enumObj[key] || "";

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
}: any) => (
  <div className={`flex flex-col items-start ${basis}`}>
    <div className="w-full">
      <div className="h-32 overflow-y-auto w-full">
        <ToggleGroup
          className="grid"
          type="multiple"
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
        <Button variant={"ghost"} onClick={selectAll}>
          Select All
        </Button>
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
  const [daysSinceOrder, setDaysSinceOrder] = useState<string>(
    filterState.daysSinceOrder
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
          value={[daysSinceOrder]}
          onValueChange={(value: string[]) => setDaysSinceOrder(value[0] || "")}
          labelMap={{ "5": "<5", "15": "<15", "30": "<30", "60": "<60" }}
          onClear={() => setDaysSinceOrder("")}
          selectAll={() => setDaysSinceOrder("5")}
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
