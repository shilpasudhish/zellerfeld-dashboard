import type { FilterState } from "./FilterState";
import type { SortState } from "./SortState";

export interface SavedConfigs {
  id: string;
  name: string;
  filters: FilterState;
  sort: SortState;
}
