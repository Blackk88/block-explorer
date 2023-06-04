import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlockList from "./components/BlockList";
import RootLayout from "./components/RootLayout";
import BlockDetails from "./components/BlockDetails";
import TransactionsList from "./components/TransactionsList";
import TransactionDetails from "./components/TransactionDetails";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
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
      {
        path: "transactions/:id",
        element: <TransactionDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
