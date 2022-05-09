import React, {useState, useEffect} from 'react'
import Auth from '../auth/Auth';
import "./dashboard.css"
import DashboardHeader from './dashboardHeader/DashboardHeader'
import LeftNav from './leftNav/LeftNav';
import Vouchers from "./vouchers/Vouchers";

const Dashboard = () => {
  const [location, setLocation] = useState("dashboard");
  
  return (
    <div>
      <DashboardHeader />
      <div className="dashboard_content">
        <LeftNav className="dashboard__leftNav" changeContent={(loc) => setLocation(loc)}  />
        <div className="dashboard__container">
          {(location === "vouchers" || location === "dashboard") && <Vouchers />}
          {location === "policy" && <p>Policy</p>}
          {location === "product" && <p>Product</p>}
          {location === "logout" && <p>logout</p>}
        </div>
      </div>

    </div>
  )
}

export default Dashboard;