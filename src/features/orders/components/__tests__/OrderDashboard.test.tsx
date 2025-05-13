import { jsx as _jsx } from "react/jsx-runtime";
jest.mock("../OrderDashboard.module.css", () => ({}));
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import OrderDashboard from "../OrderDashboard";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/state/store";
const queryClient = new QueryClient();
describe("OrderDashboard", () => {
  it("renders loading state initially", () => {
    render(
      _jsx(Provider, {
        store: store,
        children: _jsx(QueryClientProvider, {
          client: queryClient,
          children: _jsx(OrderDashboard, {}),
        }),
      })
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
