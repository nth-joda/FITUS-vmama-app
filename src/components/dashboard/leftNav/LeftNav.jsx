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
            <div className={beingActive === "vouchers" ? "nav__item active" : "nav__item" } id="nav__vouchers" onClick={() => setChange("vouchers")}>
                <NavOption key="vouchers" icon={"voucher"} dpName="Vouchers" />
            </div>
            <div className={beingActive === "policy" ? "nav__item active" : "nav__item" } id="nav__policy" onClick={() =>  setChange("policy")}>
                <NavOption key="policy" icon={"policy"} dpName="Policy"  />
            </div>
            <div className={beingActive === "product" ? "nav__item active" : "nav__item" } id="nav__product" onClick={() =>  setChange("product")}>
                <NavOption key="product" icon={"product"} dpName="Product" />
            </div>
            
        </div>
    )
}

export default LeftNav;