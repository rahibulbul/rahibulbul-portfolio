import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Index from "./page/index/Index";
import Dashboard from "./page/dashboard/home/Dashboard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
