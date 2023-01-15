import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { BeakerIcon, PlusIcon, DocumentIcon } from "@heroicons/react/24/solid";
import { useCtx } from "../context/context";
import supabase from "../supabase";

const Navbar = () => {
  const { setShowModal, loggedUser, setLoggedUser } = useCtx();
  const navigate = useNavigate();

  const logout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    let { error } = await supabase.auth.signOut();

    if (!error) {
      setLoggedUser(null);
      navigate("/");
    }
  };
  return (
    <nav className="flex justify-between w-full px-2 ss:px-5 md:px-10 py-5">
      <Link to="/" className="flex gap-1 items-center cursor-pointer group">
        <BeakerIcon className="h-6 w-6 ss:h-8 ss:w-8 text-secondary group-hover:text-[#5c84ae] duration-200 ease-linear" />
        <p className="text-xl ss:text-2xl group-hover:text-[#5c84ae] duration-200 ease-linear font-semibold">
          PAGEY
        </p>
      </Link>
      {loggedUser && (
        <ul className="flex gap-4">
          <li>
            <Link to="/pages" className="flex gap-1 items-center cursor-pointer group">
              <DocumentIcon className="h-6 w-6 ss:h-8 ss:w-8 text-secondary group-hover:text-[#5c84ae] duration-200 ease-linear" />
              <p className="hidden xs:block ss:text-xl group-hover:text-[#5c84ae] duration-200 ease-linear">
                My Pages
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/create-page"
              className="flex gap-1 items-center cursor-pointer group"
            >
              <PlusIcon className="h-6 w-6 ss:h-8 ss:w-8 text-secondary group-hover:text-[#5c84ae] duration-200 ease-linear" />
              <p className="hidden xs:block ss:text-xl group-hover:text-[#5c84ae] duration-200 ease-linear">
                New Page
              </p>
            </Link>
          </li>
        </ul>
      )}

      {loggedUser ? (
        <button
          onClick={logout}
          className="ss:text-xl cursor-pointer hover:text-[#5c84ae] duration-200 ease-linear"
        >
          LOGOUT
        </button>
      ) : (
        <div className="flex gap-1">
          <button
            onClick={() => setShowModal("signin")}
            className="ss:text-xl cursor-pointer hover:text-[#5c84ae] duration-200 ease-linear"
          >
            SIGNUP
          </button>
          <p className="ss:text-xl">/</p>
          <button
            onClick={() => setShowModal("login")}
            className="ss:text-xl cursor-pointer hover:text-[#5c84ae] duration-200 ease-linear"
          >
            LOGIN
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
