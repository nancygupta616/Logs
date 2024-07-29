import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Logs = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = window.location.href;

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    const updateLogs = () => {
      const url = new URL(window.location);
      url.searchParams.set("search", search);
      url.searchParams.set("filter", filter);
      url.searchParams.delete("page");

      fetch(url)
        .then((response) => response.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const newTable = doc.querySelector("table");
          const pagination = doc.querySelector(
            ".mt-4.flex.justify-between.items-center"
          );

          if (newTable && pagination) {
            document.querySelector("table").outerHTML = newTable.outerHTML;
            document.querySelector(
              ".mt-4.flex.justify-between.items-center"
            ).outerHTML = pagination.outerHTML;
            navigate(url.toString());
          } else {
            console.error("Elements not found in the fetched HTML");
          }
        })
        .catch((error) => {
          console.error("Error fetching and parsing HTML:", error);
        });
    };

    if (search !== "" || filter !== "") {
      updateLogs();
    }
  }, [search, filter, navigate]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleDetails = (index) => {
    console.log(`Toggling details for row: ${index}`);
    setExpandedRow(expandedRow === index ? null : index);
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

  useEffect(() => {
    fetchLog();
  }, [search, filter, page]);

  const fetchLog = async () => {
    try {
      const response = await fetch(`http://localhost:5000/logs/get-all`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLogs(data.logs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className={`bg-gray-100 ${
        darkMode ? "dark" : ""
      } dark:bg-[#212122] dark:text-white min-h-screen overflow-y-auto`}
    >
      <div className="w-full max-h-screen">
        <div className="container mx-auto p-4 h-full w-full">
          <div className="rounded-lg shadow-md p-4 dark:bg-[#2b2b2b] h-full max-w-full">
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

            <div className="table-wrapper w-full">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 dark:text-gray-100">
                    <th className="py-2">Method</th>
                    <th className="py-2">Path</th>
                    <th className="py-2">Message</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Timestamp</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <React.Fragment key={index}>
                      <tr
                        id={`row-${index}`}
                        className={`border-t cursor-pointer hover:bg-gray-50 dark:hover:bg-[#212122] ${
                          expandedRow === index
                            ? "expanded" : ""
                        }`}
                        onClick={() => toggleDetails(index)}
                      >
                        <td className="py-2">
                          <span
                            className={`bg-${log?.request?.method.toLowerCase()}-100 text-${log?.request?.method.toLowerCase()}-800 border border-${log?.request?.method.toLowerCase()}-800 px-2 py-1 rounded text-xs`}
                          >
                            {log?.request?.method}
                          </span>
                        </td>
                        <td className="py-2">{log?.request?.url}</td>
                        <td className="py-2">{log?.message}</td>
                        <td className="py-2">
                          {log.status >= 500 ? (
                            <span className="bg-red-100 text-red-800 border border-red-800 px-2 py-1 rounded text-xs">
                              {log.status}
                            </span>
                          ) : log.status >= 400 ? (
                            <span className="bg-yellow-100 text-yellow-500 border border-yellow-500 px-2 py-1 rounded text-xs">
                              {log.status}
                            </span>
                          ) : log.status >= 300 ? (
                            <span className="bg-blue-100 text-blue-800 border border-blue-800 px-2 py-1 rounded text-xs">
                              {log.status}
                            </span>
                          ) : (
                            <span className="bg-green-100 text-green-800 border border-green-800 px-2 py-1 rounded text-xs">
                              {log.status}
                            </span>
                          )}
                        </td>
                        <td className="py-2">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td>
                        <div
                            className={`flex ${
                              expandedRow === index ? "reversed" : ""
                            }`}
                          >
                            <div className="bg-blue-500 arrow arrow-1"></div>
                            <div className="bg-blue-500 arrow arrow-2"></div>
                          </div>
                        </td>
                      </tr>
                      <tr
                        className={`collapsible-content ${
                          expandedRow === index ? "expanded" : ""
                        }`}
                      >
                        <td colSpan="6" className="p-0">
                          <div
                            id={`details-${index}`}
                          >
                            <div className="p-4">
                              <h3 className="font-semibold mb-2">
                                Request Details:
                              </h3>
                              <div className="p-2">
                                <pre className="bg-gray-100 text-black dark:bg-[#212122] dark:text-white p-4 overflow-x-auto">
                                  {JSON.stringify(log.request, null, 2)}
                                </pre>
                              </div>
                              <h3 className="font-semibold mt-4 mb-2">
                                Response Details:
                              </h3>
                              <div className="p-2">
                                <pre className="bg-gray-100 text-black dark:bg-[#212122] dark:text-white p-4 overflow-x-auto">
                                  {JSON.stringify(log.response, null, 2)}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
              {page > 1 ? (
                <a
                  href={currentUrl.replace(`page=${page}`, `page=${page - 1}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Previous
                </a>
              ) : (
                <span></span>
              )}
              {page < totalPages ? (
                <a
                  href={currentUrl.replace(`page=${page}`, `page=${page + 1}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Next
                </a>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
