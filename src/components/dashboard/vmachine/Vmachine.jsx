import React from 'react'
import "./vmachine.css";

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';

import vList from "../../../assets/vData.json";
import Searcher from "./searcher/Searcher";
import Updater from "./updater/Updater";
import Table from "../../utils/table/Table";
const voucherTableHead = [
  "",
];



const renderBody = (item, index) => (
  <tr key={index}>
   
    <td>{item.vAeon}</td>
  
  
  </tr>
);


const Vmachine = () => {
  return (
    <div className="vouchers">
        <div className="vouchers__header">
            <Searcher />
            <Updater />
        </div>
        <div className="vouchers__content">
          <Table
              limit="10"
     
              bodyData={vList}
              renderBody={(item, index) => renderBody(item, index)}/>
        </div>
    </div>
  )
}

export default Vmachine