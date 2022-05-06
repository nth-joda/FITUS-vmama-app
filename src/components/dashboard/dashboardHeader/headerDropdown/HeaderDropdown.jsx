import React from 'react'
import "./headerDropdown.css"
const HeaderDropdown = () => {
  return (
    <div className="headerDropdown">
        <ul>
            <li className="dropdown-item">
                <a href="#">Cài đặt</a>
            </li>
            <li className="dropdown-item">
                <a href="#">Đăng xuất</a>
            </li>
        </ul>
    </div>
  )
}

export default HeaderDropdown