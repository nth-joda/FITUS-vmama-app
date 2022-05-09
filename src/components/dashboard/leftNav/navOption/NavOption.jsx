import React from "react";
import DiscountIcon from '@mui/icons-material/Discount';
import "./navOption.css"

const NavOption = (props) => {
    return (
        <div className={"NavOption "+props.isActive}>
            <div  className="NavOption__icon">
                <DiscountIcon />
            </div>
            
            <p className="NavOption_name">{props.dpName}</p>
        </div>
    )
}

export default NavOption;