import { Outlet, Link } from "react-router-dom";
import BlockList from "./BlockList";

export default function Home() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
      </div>
      <Outlet />
    </>
  );
}
