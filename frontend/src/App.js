import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "./Components/Login";
import Logs from "./Components/Logs";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </div>
  );
}

export default App;
