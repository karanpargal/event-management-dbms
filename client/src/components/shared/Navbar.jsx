import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Eventify
        </Link>
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/home"
              className="text-white hover:underline hover:underline-offset-2"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              className="text-white hover:underline hover:underline-offset-2"
            >
              Events
            </Link>
          </li>
          {!localStorage.getItem("userId") && (
            <li>
              <Link
                to="/login"
                className="text-white hover:underline hover:underline-offset-2"
              >
                Login
              </Link>
            </li>
          )}
          {!localStorage.getItem("userId") && (
            <li>
              <Link
                to="/register"
                className="text-white hover:underline hover:underline-offset-2"
              >
                Register
              </Link>
            </li>
          )}
          {localStorage.getItem("userId") && (
            <li>
              <Link
                to="/add-event"
                className="text-white hover:underline hover:underline-offset-2"
              >
                Add Event
              </Link>
            </li>
          )}
          {localStorage.getItem("userId") && (
            <li>
              <Link
                to="/add-venue"
                className="text-white hover:underline hover:underline-offset-2"
              >
                Add Venue
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
