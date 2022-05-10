import React from "react";
import DiscountIcon from '@mui/icons-material/Discount';
import CategoryIcon from '@mui/icons-material/Category';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import "./navOption.css"

const NavOption = (props) => {
    return (
        <div className={"NavOption "+props.isActive}>
            <div  className="NavOption__icon">
                {props.dpName==="Vouchers" && <DiscountIcon />}
                {props.dpName==="Product" && <CategoryIcon />}
                {props.dpName==="Vmachine" && <SmartToyIcon />}
            </div>
            
            <p className="NavOption_name">{props.dpName}</p>
        </div>
    )
}

export default NavOption;