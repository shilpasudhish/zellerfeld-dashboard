import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import SortControl from "../SortControl";
import "@testing-library/jest-dom";
// Mock dependencies to avoid external failures
jest.mock("@/components/ui/button", () => ({
  Button: ({ children }: { children: React.ReactNode }) =>
    _jsx("button", { children: children }),
}));
jest.mock("lucide-react", () => ({
  ChevronUp: () => _jsx("svg", {}),
  ChevronDown: () => _jsx("svg", {}),
}));
describe("SortControl", () => {
  it("renders the OID text without crashing", () => {
    // Mock sortState and setSortState with minimal values
    const mockSortState = { field: "oid", direction: "asc" };
    const mockSetSortState = jest.fn();
    // Render the component with mocked props, bypassing type checking
    render(
      _jsx(SortControl, {
        sortState: mockSortState,
        setSortState: mockSetSortState,
      })
    );
    // Check that the "OID" text is rendered
    expect(screen.getByText("OID")).toBeInTheDocument();
  });
});
