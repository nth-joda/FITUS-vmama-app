import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Navigate } from "react-router-dom";
import "./headerDropdown.css";

const HeaderDropdown = () => {
  const [isLogOut, setIsLogOut] = useState(false);
  const handleLogOut = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    setIsLogOut(true);
  };
  return isLogOut ? (
    <Navigate to="/login" />
  ) : (
    <div className="headerDropdown">
      <ul className="headerList">
        <li className="dropdown-item">
          <a href="#">
            <SettingsIcon className="dropdown-icon" />
            <p>Cài đặt</p>
          </a>
        </li>
        <li className="dropdown-item logout">
          <a href="" onClick={() => handleLogOut()}>
            <LogoutIcon className="dropdown-icon" />
            <p>Đăng xuất</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HeaderDropdown;
