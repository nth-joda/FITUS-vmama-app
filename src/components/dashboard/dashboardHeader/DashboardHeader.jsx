import React, { useState, useEffect } from "react";
import "./dashboardHeader.css";
import HeaderDropdown from "./headerDropdown/HeaderDropdown";
import PersonIcon from "@mui/icons-material/Person";
import Popover from "@mui/material/Popover";

import Logo from "../../../assets/VMAMA logo/VMAMA Text only.png";

const DashboardHeader = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("name"));
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="dashboardHeader">
      <div className="dashboardHeader__logo">
        <img src={Logo} alt="logo" className="dashboardHeader__logo-img" />
      </div>

      <div className="dashboardHeader__menu">
        <div
          className="dashboardHeader__menu-profile"
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        >
          <PersonIcon className="profile-avt"></PersonIcon>
          <div className="profile-name">{userName}</div>
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <p className="widen-area"></p>
          <HeaderDropdown></HeaderDropdown>
        </Popover>
      </div>
    </div>
  );
};

export default DashboardHeader;
