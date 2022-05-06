import React from 'react'
import "./dashboard.css"
import DashboardHeader from './dashboardHeader/DashboardHeader'
import LeftNav from './leftNav/LeftNav';

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader/>
      <LeftNav />
    </div>
  )
}

export default Dashboard;