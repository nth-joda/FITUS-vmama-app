import React from 'react'
import "./dashboardHeader.css"
import HeaderDropdown from './headerDropdown/HeaderDropdown'

const DashboardHeader = () => {
  return (
    <div className="dashboardHeader">
        <div className="dashboardHeader__logo">
            <h2>VMAMA</h2>
        </div>
        <div className="dashboardHeader__menu">
            <div className="dashboardHeader__menu-profile">
                <i className='bx bxs-user-circle profile-avt'></i>
                <div className="profile-name">Nguyen Van A</div>
                <i className='bx bxs-down-arrow profile-dropdown'></i>
            </div>
        </div>
        <HeaderDropdown ></HeaderDropdown>
    </div>
  )
}

export default DashboardHeader