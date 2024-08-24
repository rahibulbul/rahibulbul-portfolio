import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Index from "./page/index/Index";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
