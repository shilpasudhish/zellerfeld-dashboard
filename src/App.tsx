import OrderDashboard from "./features/orders/components/OrderDashboard";

OrderDashboard;
function App() {
  return (
    <>
      <div className="min-h-screen bg-white text-black">
        <h1 className="text-xl font-semibold p-4 text-left">
          Zellerfeld Order Dashboard
        </h1>
        <OrderDashboard />
      </div>
    </>
  );
}

export default App;
