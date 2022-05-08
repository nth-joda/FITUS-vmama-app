import React from "react";
import "./leftNav.css";

import NavOption from "./navOption/NavOption"

const LeftNav = () => {
    return (
        <div className="leftNav">
            <NavOption icon={"voucher"} dpName="Vouchers" />
            <NavOption icon={"policy"} dpName="Policy" />
            <NavOption icon={"product"} dpName="Product" />
            <NavOption icon={"policy"} dpName="Policy" />
        </div>
    )
}

export default LeftNav;