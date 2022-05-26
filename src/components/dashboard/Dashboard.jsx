import React, { useState, useEffect } from "react";
import Auth from "../auth/Auth";
import { Navigate } from "react-router-dom";
import "./dashboard.css";
import DashboardHeader from "./dashboardHeader/DashboardHeader";
import LeftNav from "./leftNav/LeftNav";
import Vouchers from "./vouchers/Vouchers";
import Products from "./products/Products";
import Vmachine from "./vmachine/Vmachine";

function Dashboard(props) {
  const [location, setLocation] = useState(props.lct ? props.lct : "product");
  return (
    <div>
      <DashboardHeader />
      <div className="dashboard_content">
        <LeftNav
          className="dashboard__leftNav"
          lct={location}
          changeContent={(loc) => setLocation(loc)}
        />
        <div className="dashboard__container">
          {(location === "vouchers" || location === "dashboard") && (
            <Vouchers />
          )}
          {location === "product" && <Products />}
          {location === "vmachine" && <Vmachine />}
          {location === "logout" && <p>logout</p>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
