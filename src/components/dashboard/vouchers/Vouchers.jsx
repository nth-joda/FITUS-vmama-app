import React from 'react'
import "./vouchers.css";

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';

import vList from "../../../assets/vouchers.json";
import Searcher from "../../utils/searcher/Searcher";
import Updater from "../../utils/updater/Updater";
import Table from "../../utils/table/Table";
const voucherTableHead = [
  "",
  "Tên voucher",
  "Tên brand",
  "Còn lại",
  "Đã đổi",
  "Chỉnh sửa",
];

const renderHead = (item, index) => <th className={index === 3 || index === 4 ? "centering" : ""} key={index}>{item}</th>;

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
    <td>{item.voucher_name}</td>
    <td>{item.brand_name}</td>
    <td className={item.left > 0 ? "centering safe-txt" : "centering danger-txt"}>{item.left}</td>
    <td className="danger-txt centering">{item.used}</td>
    <td className="cta-edit">
      <IconButton aria-label="edit" size="large" sx={{color: "var(--color-main)", transform:"scale(1.1)"}}>
        <EditIcon />
      </IconButton>
    </td>
  </tr>
);


const Vouchers = () => {
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

export default Vouchers