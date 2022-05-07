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
                  Cài đặt
                </a>
            </li>
            <li className="dropdown-item">
                <a href="#">
                  <LogoutIcon className="dropdown-icon" />
                  Đăng xuất
                </a>
            </li>
        </ul>
    </div>
  )
}

export default HeaderDropdown