import { OrderTable } from "./features/orders/components/Ordertable";

function App() {
  return (
    <>
      <div className="min-h-screen bg-white text-black">
        <h1 className="text-2xl font-semibold p-4 text-center">
          Zellerfeld Orders
        </h1>
        <OrderTable />
      </div>
    </>
  );
}

export default App;
