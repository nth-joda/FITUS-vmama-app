import React from "react";
import "./navOption.css"

const NavOption = (props) => {
    return (
        <div className="NavOption">
            <p>{props.icon}</p>
            <p>{props.dpName}</p>
        </div>
    )
}

export default NavOption;