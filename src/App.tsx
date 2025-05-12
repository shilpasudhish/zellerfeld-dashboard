import OrderDashboard from "./features/orders/components/OrderDashboard";
import { store } from "./state/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-white text-black">
          <h1 className="text-xl font-semibold p-4 text-center bg-gray-800 text-white">
            Zellerfeld Order Dashboard
          </h1>
          <OrderDashboard />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
