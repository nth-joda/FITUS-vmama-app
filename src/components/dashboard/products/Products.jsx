import React from 'react'
import "./products.css";

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';

import vList from "../../../assets/vData.json";
import Searcher from "./searcher/Searcher";
import Updater from "./updater/Updater";
import Table from "../../utils/table/Table";
const voucherTableHead = [
  "",
  "Tên voucher",
  "Tên brand",
  "Giá tiền",
  "Chỉnh sửa",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>
    <Checkbox
      sx = {{ 
        '& .MuiSvgIcon-root': { fontSize: 28 },
        color: '#fff',
        '&.Mui-checked': {color: '#fff' }}
      }
    />
    </td>
    <td>{item.vName}</td>
    <td>{item.bName}</td>
    <td>{item.left}</td>
    <td className="cta-edit">
      <IconButton aria-label="edit" size="large" sx={{color: "var(--color-main)", transform:"scale(1.1)"}}>
        <EditIcon />
      </IconButton>
    </td>
  </tr>
);


const Products = () => {
  return (
    <div className="vouchers">
        <div className="vouchers__header">
            <Searcher />
            <Updater />
        </div>
        <div className="vouchers__content">
          <Table
              limit="10"
              headData={voucherTableHead}
              renderHeader={(item, index) => renderHead(item, index)}
              bodyData={vList}
              renderBody={(item, index) => renderBody(item, index)}/>
        </div>
    </div>
  )
}

export default Products