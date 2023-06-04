import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlockList from "./components/BlockList";
import Home from "./components/Home";
import BlockDetails from "./components/BlockDetails";
import TransactionsList from "./components/TransactionsList";

const router = createBrowserRouter([
  {
    element: <Home />,
    children: [
      {
        path: "/",
        element: <BlockList />,
      },
      {
        path: "/blocks/:id",
        element: <BlockDetails />,
      },
      {
        path: "/blocks/:id/transactions",
        element: <TransactionsList />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
