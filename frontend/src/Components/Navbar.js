import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ theme, toggleTheme }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-between items-center shadow-sm py-4 px-16 md:px-10 sm:px-5  bg-white dark:bg-black dark:text-white">
      <p className="text-2xl font-semibold text-gray-900 sm:text-xl dark:text-white">V-logs</p>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          name="search"
          placeholder="Search logs..."
          value={search}
          onChange={handleSearchChange}
          className="px-3 py-1 border rounded dark:bg-[#212122]"
        />
        <select
          name="filter"
          value={filter}
          onChange={handleFilterChange}
          className="px-3 py-1 border rounded dark:bg-[#212122]"
        >
          <option value="all">All Levels</option>
          <option value="info">Info</option>
          <option value="error">Error</option>
          <option value="warn">Warn</option>
        </select>
        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Search
        </button>
        <div className="nav-login-cart">
          {localStorage.getItem("auth-token") ? (
            <button
              onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.replace("/");
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/">
              <button>Login</button>
            </Link>
          )}
        </div>
        <div className="flex items-center">
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "dark_mode" : "light_mode"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default Navbar;
