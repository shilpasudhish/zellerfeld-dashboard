import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order } from "@/types/order";
import { SortState } from "@/types/SortState";
import { FilterState } from "@/types/FilterState";
import { RootState } from "@/state/store";
import { saveCurrentConfig } from "@/state/saved-configs/SavedConfigSlice";

import { Card, CardContent } from "@/components/ui/card";
import OrderTable from "../components/OrderTable";
import SortControl from "./SortControl";
import FilterControl from "./FilterControl";
import ConfigPresets from "./ConfigPresets"; // Optional: Remove if unused
import orderService from "@/services/orderService";
import "./OrderDashboard.module.css";

const OrderDashboard = () => {
  const { currentConfig } = useSelector(
    (state: RootState) => state.savedConfigs
  );
  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState<SortState>(currentConfig.sort);
  const [filterOrder, setFilterOrder] = useState<FilterState>(
    currentConfig.filters
  );

  // Re-sync local state when Redux config changes
  useEffect(() => {
    setSortOrder(currentConfig.sort);
    setFilterOrder(currentConfig.filters);
  }, [currentConfig]);

  // Save config to Redux store on state change
  useEffect(() => {
    dispatch(saveCurrentConfig({ filters: filterOrder, sort: sortOrder }));
  }, [sortOrder, filterOrder, dispatch]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos", sortOrder, filterOrder],
    queryFn: () => orderService.getOrders(sortOrder, filterOrder),
  });

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (isError)
    return (
      <div className="text-center p-4 text-red-500">Error loading orders</div>
    );

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full border-2 border-black rounded-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-max">
              <ConfigPresets />
              <SortControl
                sortState={sortOrder}
                setSortState={(sortState: SortState) => setSortOrder(sortState)}
              />
              <FilterControl
                filterState={filterOrder}
                updateFilterState={(filterState: FilterState) =>
                  setFilterOrder(filterState)
                }
              />
              <OrderTable orders={data as Order[]} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDashboard;
