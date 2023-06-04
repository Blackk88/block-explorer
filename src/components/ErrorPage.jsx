import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="text-center text-lg my-10">
      <p className=" text-red-400">Something went wrong</p>
      <Link to="/" className="uppercase">
        🏠 Homepage
      </Link>
    </div>
  );
}
