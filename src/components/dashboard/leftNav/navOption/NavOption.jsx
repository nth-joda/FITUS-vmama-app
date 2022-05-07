import React from "react";
import DiscountIcon from '@mui/icons-material/Discount';
import "./navOption.css"

const NavOption = (props) => {
    return (
        <div className="NavOption">
            <DiscountIcon className="NavOption__icon" />
            <p className="NavOption_name">{props.dpName}</p>
        </div>
    )
}

export default NavOption;