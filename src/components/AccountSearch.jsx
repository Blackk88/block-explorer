import { useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AccountSearch() {
  const addressRef = useRef();
  const nav = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    const address = addressRef.current.value;
    nav(`/account/${address}`);
  }

  return (
    <div className="">
      <form
        action=""
        className="flex flex-col sm:flex-row gap justify-center gap-3 container mx-auto px-3 max-w-3xl"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          placeholder="Address / ENS Name"
          className="text-sm px-3 py-2 rounded-md border border-blue-300 sm:w-3/4"
          ref={addressRef}
        />
        <button className="border py-2 px-6 rounded-xl bg-blue-300 text-blue-700">
          Search
        </button>
      </form>
      <Outlet />
    </div>
  );
}
