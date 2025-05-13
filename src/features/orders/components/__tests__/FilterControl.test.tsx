import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import FilterControl from "../FilterControl";
import "@testing-library/jest-dom";
// Mock dependencies to avoid external failures
jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => _jsx("button", { onClick: onClick, children: children }),
}));
jest.mock("@/components/ui/input", () => ({
  Input: ({
    placeholder,
    value,
    onChange,
  }: {
    placeholder: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) =>
    _jsx("input", {
      placeholder: placeholder,
      value: value,
      onChange: onChange || (() => {}),
      "data-testid": "filter-input",
    }),
}));
jest.mock("@/components/ui/toggle-group", () => ({
  ToggleGroup: () => null,
  ToggleGroupItem: () => null,
}));
jest.mock("../SortControl", () => ({
  columns: Array(8).fill({ basis: "basis-[11.5%]" }), // Mock 8 columns to match FilterControl's usage
}));
jest.mock("@/hooks/useDebouncedSearch", () => ({
  useDebouncedSearch: (value: any) => value, // Return the value directly to avoid debouncing logic
}));
jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.join(" "),
}));
describe("FilterControl", () => {
  it("renders the Order ID input field without crashing", () => {
    const mockFilterState = {
      status: [],
      orderId: "",
      customer: "",
      type: [],
      lock: [],
      designer: [],
      model: [],
      daysSinceOrder: "",
    };
    const mockUpdateFilterState = jest.fn();
    render(
      _jsx(FilterControl, {
        filterState: mockFilterState,
        updateFilterState: mockUpdateFilterState,
      })
    );
    // Check that the Order ID input field is rendered
    const orderIdInput = screen.getByPlaceholderText("Order ID");
    expect(orderIdInput).toBeInTheDocument();
  });
});
