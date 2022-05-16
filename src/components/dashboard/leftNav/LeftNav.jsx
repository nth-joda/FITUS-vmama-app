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
            <div onClick={() => setChange("vouchers")}>
                <NavOption isActive={beingActive === "vouchers" ? "active" : "" } key="vouchers" icon={"voucher"} dpName="Vouchers" />
            </div>
            
            <div onClick={() =>  setChange("product")}>
                <NavOption isActive={beingActive === "product" ? "active" : "" }  key="product" icon={"product"} dpName="Product" />
            </div>
            
            <div onClick={() =>  setChange("vmachine")}>
                <NavOption isActive={beingActive === "vmachine" ? "active" : "" } key="vmachine" icon={"vmachine"} dpName="Vmachine"  />
            </div>
        </div>
    )
}

export default LeftNav;