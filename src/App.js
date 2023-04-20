import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import React from "react";
import Logged from "./pages/Logged";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/logged" element={<Logged />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
