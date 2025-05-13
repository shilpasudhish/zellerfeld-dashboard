import { Analytics } from "@vercel/analytics/react";
import OrderDashboard from "./features/orders/components/OrderDashboard";
import { store } from "./state/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import zellerfeld from "./assets/zellerfeld.jpg";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-white text-black">
            <header className="w-full bg-gray-800 text-white">
              <div className="flex items-center  gap-2 p-4">
                <img src={zellerfeld} alt="Logo" className="h-6 w-6" />{" "}
                <h1 className="text-xl font-semibold">Order Dashboard</h1>{" "}
              </div>
            </header>
            <main className="p-4">
              <OrderDashboard />
            </main>
          </div>
        </QueryClientProvider>
      </Provider>
      <Analytics />
    </>
  );
}

export default App;
