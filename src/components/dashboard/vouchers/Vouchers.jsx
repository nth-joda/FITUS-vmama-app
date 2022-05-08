import React from 'react'
import "./vouchers.css";

import Searcher from "./searcher/Searcher";
import Updater from "./updater/Updater";
const Vouchers = () => {
  return (
    <div className="vouchers">
        <div className="vouchers__header">
            <Searcher />
            <Updater />
        </div>
        <div className="vouchers__content">
            Contenttttt
        </div>
    </div>
  )
}

export default Vouchers