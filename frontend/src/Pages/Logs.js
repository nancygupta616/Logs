import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation  } from "react-router-dom";
import Login from "../Components/Login";
import Navbar from "../Components/Navbar"
import DisplayLogs from "../Components/DisplayLogs";
import Sidebar from "../Components/Sidebar";


const Logs = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const location = useLocation();


  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };


  return (
    <div className={`${theme} w-full dark:bg-black`}>
      {location.pathname === "/logs" && (
        <>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <div className="flex">
            <Sidebar className="w-2/5" />
            <div className="flex-grow">
              <Routes>
                <Route path="/logs" element={<DisplayLogs />} />
              </Routes>
            </div>
          </div>
        </>
      )}
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}


export default Logs;
