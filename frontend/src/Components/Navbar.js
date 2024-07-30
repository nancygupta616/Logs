import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    let savedTheme = localStorage.getItem("theme");

    if (!savedTheme) {
      savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    html.classList.toggle("dark");
    const newTheme = html.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setDarkMode(newTheme === "dark");
  };

  return (
    <div
      className={`bg-blue-100 ${
        darkMode ? "dark" : ""
      } dark:bg-[#212122] dark:text-white`}
    >
      <div className="container mx-auto p-4">
        <div className="rounded-lg shadow-md p-4 dark:bg-[#2b2b2b]">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-blue-500">V-logs</h1>
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
              <div className="flex items-center">
                <span
                  className="material-symbols-outlined cursor-pointer"
                  onClick={toggleTheme}
                >
                  {darkMode ? "dark_mode" : "light_mode"}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
