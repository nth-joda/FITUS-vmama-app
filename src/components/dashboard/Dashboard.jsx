import React, {useState, useEffect} from 'react'
import Auth from '../auth/Auth';
import "./dashboard.css"
import DashboardHeader from './dashboardHeader/DashboardHeader'
import LeftNav from './leftNav/LeftNav';
import Vouchers from "./vouchers/Vouchers";
import Products from "./products/Products";
import Vmachine from './vmachine/Vmachine';

function Dashboard() {
  const [location, setLocation] = useState("dashboard");

  return (
    <div>
      <DashboardHeader />
      <div className="dashboard_content">
        <LeftNav className="dashboard__leftNav" changeContent={(loc) => setLocation(loc)} />
        <div className="dashboard__container">
          {(location === "vouchers" || location === "dashboard") && <Vouchers />}        
          {location === "product" && <Products/>}
          {location === "vmachine" && <Vmachine/>}
          {location === "logout" && <p>logout</p>}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;