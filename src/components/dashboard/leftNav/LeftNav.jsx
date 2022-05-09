import React, {useState} from "react";
import "./leftNav.css";

import NavOption from "./navOption/NavOption"

const LeftNav = (props) => {
    const [beingActive, setBeingActive] = useState("vouchers");

    const setChange = (loc) => {
        props.changeContent(loc);
        setBeingActive(loc);
    }
    return (
        <div className="leftNav">
            <div id="nav__vouchers" onClick={() => setChange("vouchers")}>
                <NavOption isActive={beingActive === "vouchers" ? "active" : "" } key="vouchers" icon={"voucher"} dpName="Vouchers" />
            </div>
            <div onClick={() =>  setChange("policy")}>
                <NavOption isActive={beingActive === "policy" ? "active" : "" } key="policy" icon={"policy"} dpName="Policy"  />
            </div>
            <div onClick={() =>  setChange("product")}>
                <NavOption isActive={beingActive === "product" ? "active" : "" }  key="product" icon={"product"} dpName="Product" />
            </div>
            
        </div>
    )
}

export default LeftNav;