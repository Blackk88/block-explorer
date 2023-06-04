import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlockList from "./components/BlockList";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blocks",
    element: <BlockList />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
