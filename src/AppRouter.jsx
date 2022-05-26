import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  useNavigate,
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import Auth from "./components/auth/Auth";
import Page404 from "./components/dashboard/page404/Page404";
const AppRouter = () => {
  let navigate = useNavigate();
  const handleNavigate = (m) => {
    if (m.code === "200") {
      navigate("/dashboard");
    }
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />}></Route>
        <Route
          path="/login"
          element={<Auth handleAuth={(m) => handleNavigate(m)} />}
        ></Route>
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("token") ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/vouchers"
          element={<Dashboard lct="vouchers" />}
        ></Route>
        <Route
          exact
          path="/product"
          element={<Dashboard lct="product" />}
        ></Route>
        <Route
          exact
          path="/vmachine"
          element={<Dashboard lct="vmachine" />}
        ></Route>
         <Route
path='*'
          element={<Page404 />}
        ></Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
