import { LockReason } from "../../types/enums/LockReasonEnum";
import { ModelDesigner } from "../../types/enums/ModelDesignerEnum";
import { OrderStatus } from "../../types/enums/OrderStatusEnum";
import { OrderType } from "../../types/enums/OrderTypeEnum";
import { FilterState } from "../../types/FilterState";
import { SavedConfigs } from "../../types/SavedConfigs";
import { SortState } from "../../types/SortState";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  savedConfigs: SavedConfigs[];
  currentConfig: {
    filters: FilterState;
    sort: SortState;
  };
} = {
  savedConfigs: [
    {
      id: nanoid(),
      name: "Active Orders Ascending",
      filters: {
        orderId: "",
        status: [OrderStatus.Delivered],
        type: [OrderType.Seeding, OrderType.Order],
        lock: [LockReason.Seeding],
        customer: "",
        model: [ModelDesigner.Lotus],
        designer: [ModelDesigner.Lotus],
        daysSinceOrder: "",
      },
      sort: { field: "oid", direction: "asc" },
    },
    {
      id: nanoid(),
      name: "Pending Orders Descending",
      filters: {
        orderId: "",
        status: [OrderStatus.Printing],
        type: [],
        lock: [],
        customer: "",
        model: [],
        designer: [],
        daysSinceOrder: "30",
      },
      sort: { field: "daysSinceOrder", direction: "desc" },
    },
  ],
  currentConfig: {
    filters: {
      orderId: "",
      status: [],
      type: [],
      lock: [],
      customer: "",
      model: [],
      designer: [],
      daysSinceOrder: "",
    },
    sort: { field: "oid", direction: "asc" },
  },
};

const savedConfigsSlice = createSlice({
  name: "savedConfigs",
  initialState,
  reducers: {
    // Save a new configuration
    saveConfig(state, action: PayloadAction<Omit<SavedConfigs, "id">>) {
      const newConfig: SavedConfigs = {
        id: nanoid(),
        ...action.payload,
      };
      state.savedConfigs.push(newConfig);
    },
    // Apply a saved configuration
    applySavedConfig(state, action: PayloadAction<string>) {
      const config = state.savedConfigs.find((c) => c.id === action.payload);
      if (config) {
        state.currentConfig = {
          filters: config.filters,
          sort: config.sort,
        };
      }
    },
    // Store current config
    saveCurrentConfig(
      state,
      action: PayloadAction<{ filters: FilterState; sort: SortState }>
    ) {
      state.currentConfig = action.payload;
    },
    // Delete a saved configuration
    deleteConfig(state, action: PayloadAction<string>) {
      state.savedConfigs = state.savedConfigs.filter(
        (c) => c.id !== action.payload
      );
    },
  },
});

export const { saveConfig, applySavedConfig, saveCurrentConfig, deleteConfig } =
  savedConfigsSlice.actions;

export default savedConfigsSlice.reducer;
