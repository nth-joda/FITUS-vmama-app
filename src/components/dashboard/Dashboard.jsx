import React from 'react'
import "./dashboard.css"
import DashboardHeader from './dashboardHeader/DashboardHeader'
import LeftNav from './leftNav/LeftNav';
import Vouchers from "./vouchers/Vouchers";

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className="dashboard_content">
        <LeftNav className="dashboard__leftNav" />
        <div className="dashboard__container">
          <Vouchers />
        </div>
      </div>

    </div>
  )
}

export default Dashboard;