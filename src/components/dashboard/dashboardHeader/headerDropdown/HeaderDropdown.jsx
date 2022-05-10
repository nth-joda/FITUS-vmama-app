import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import "./headerDropdown.css"



const HeaderDropdown = () => {
  return (
    <div className="headerDropdown">
        <ul className="headerList">
            <li className="dropdown-item">
                <a href="#">
                  <SettingsIcon className="dropdown-icon" />
                  <p>Cài đặt</p>
                </a>
            </li>
            <li className="dropdown-item logout">
                <a href="#">
                  <LogoutIcon className="dropdown-icon" />
                  <p>Đăng xuất</p>
                </a>
            </li>
        </ul>
    </div>
  )
}

export default HeaderDropdown