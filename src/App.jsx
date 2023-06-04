import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlockList from "./components/BlockList";
import RootLayout from "./components/RootLayout";
import BlockDetails from "./components/BlockDetails";
import TransactionsList from "./components/TransactionsList";
import TransactionDetails from "./components/TransactionDetails";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <BlockList />,
      },
      {
        path: "/:id",
        element: <BlockDetails />,
      },
      {
        path: "/:id/transactions",
        element: <TransactionsList />,
      },
      {
        path: "/:id/transactions/:txhash",
        element: <TransactionDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
