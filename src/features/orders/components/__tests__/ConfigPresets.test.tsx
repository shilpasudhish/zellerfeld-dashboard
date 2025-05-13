import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import ConfigPresets from "../ConfigPresets";
import "@testing-library/jest-dom";
// Mock dependencies to avoid external failures
jest.mock("@/components/ui/button", () => ({
  Button: ({ children }: { children: React.ReactNode }) =>
    _jsx("button", { children: children }),
}));
jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) =>
    _jsx("div", { children: children }),
  DropdownMenuTrigger: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) =>
    _jsx("div", {
      className: className,
      "data-testid": "dropdown-trigger",
      children: children,
    }),
  DropdownMenuContent: () => null,
  DropdownMenuLabel: () => null,
  DropdownMenuSeparator: () => null,
  DropdownMenuItem: () => null,
}));
jest.mock("@/components/ui/dialog", () => ({
  Dialog: () => null,
  DialogContent: () => null,
  DialogHeader: () => null,
  DialogTitle: () => null,
  DialogDescription: () => null,
  DialogFooter: () => null,
}));
jest.mock("@/components/ui/input", () => ({
  Input: () => _jsx("input", {}),
}));
jest.mock("lucide-react", () => ({
  ChevronRight: () => _jsx("svg", { "data-testid": "chevron-right" }),
  Trash2: () => _jsx("svg", {}),
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockReturnValue({
    savedConfigs: [],
    currentConfig: { filters: {}, sort: {} },
  }),
  Provider: ({ children }: { children: React.ReactNode }) => children,
}));
describe("ConfigPresets", () => {
  it("renders the dropdown trigger without crashing", () => {
    render(_jsx(ConfigPresets, {}));
    // Check that the dropdown trigger is rendered
    const dropdownTrigger = screen.getByTestId("dropdown-trigger");
    expect(dropdownTrigger).toBeInTheDocument();
  });
});
