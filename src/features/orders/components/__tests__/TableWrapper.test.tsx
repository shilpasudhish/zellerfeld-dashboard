import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TableWrapper from "../TableWrapper";
// Mock dependencies
jest.mock("@/components/ui/table", () => ({
  Table: ({ children }: { children: React.ReactNode }) =>
    _jsx("table", { children: children }),
  TableBody: ({ children }: { children: React.ReactNode }) =>
    _jsx("tbody", { children: children }),
  TableRow: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => _jsx("tr", { className: className, children: children }),
  TableCell: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => _jsx("td", { className: className, children: children }),
}));
jest.mock("lucide-react", () => ({
  ChevronDown: () => _jsx("svg", { "data-testid": "chevron-down" }),
  ChevronRight: () => _jsx("svg", { "data-testid": "chevron-right" }),
}));
jest.mock("../SortControl", () => ({
  columns: [
    { field: "oid", basis: "basis-[11.5%]" },
    { field: "status", basis: "basis-[19.5%]" },
    // Add more columns as needed for testing
  ],
}));
describe("OrderTable", () => {
  it("displays 'No orders found' when orders array is empty", () => {
    // Render the component with an empty orders array
    render(_jsx(TableWrapper, { orders: [] }));
    // Check for the "No orders found" message
    const message = screen.getByText("No orders found");
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass("text-gray-500");
  });
});
