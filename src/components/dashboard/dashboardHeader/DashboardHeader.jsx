import React from 'react'
import "./dashboardHeader.css"
import HeaderDropdown from './headerDropdown/HeaderDropdown'
import PersonIcon from '@mui/icons-material/Person';

const DashboardHeader = () => {
  const showDropdownHandler = () => {

  }
  return (
    <div className="dashboardHeader">
        <div className="dashboardHeader__logo" onClick={showDropdownHandler}>
            <h2>VMAMA</h2>
        </div>
        <div className="dashboardHeader__menu">
            <div className="dashboardHeader__menu-profile">
                <PersonIcon className='profile-avt'></PersonIcon>
                <div className="profile-name">Nguyen Van A</div>
            </div>
            <div className="dashboardHeader__dropdown">
              <HeaderDropdown></HeaderDropdown>
            </div>
        </div>
        
        
    </div>
  )
}

export default DashboardHeader