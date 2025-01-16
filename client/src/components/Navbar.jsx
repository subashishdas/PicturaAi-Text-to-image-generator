import React, { useContext, useState } from "react";
import Logo from "../assets/PicturaLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img className="w-28 sm:w-32 lg:w-48" src={Logo} alt="" />
      </Link>

      <div>
        {user ? (
          // If user is authenticated
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="flex items-center gap-2 bg-pink-50 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700">
              <FaStar className="w-5" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credit left : {credit}
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">Hi, {user.name}</p>
            <div className="relative group">
              <FaUser className="w-10 drop-shadow" />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
                <ul className="list-none m-0 p-2 rounded-md bg-white text-sm">
                  <li onClick={logout} className="py-1 px-2 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          // If user is not authenticated
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              onClick={() => navigate("/pricing")}
              className="text-gray-800 cursor-pointer"
            >
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-small rounded-lg hover:bg-zinc-700"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
