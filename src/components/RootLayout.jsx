import { Outlet, Link } from "react-router-dom";
import BlockList from "./BlockList";

export default function RootLayout() {
  return (
    <>
      <nav className="flex gap-3 p-5">
        <Link to="/" className="uppercase hover:font-medium">
          Blocks
        </Link>
        <Link to="/account" className="uppercase hover:font-medium">
          Accounts
        </Link>
      </nav>
      <Outlet />
    </>
  );
}
