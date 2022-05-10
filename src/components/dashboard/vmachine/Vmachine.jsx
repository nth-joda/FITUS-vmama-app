import React from 'react'
import "./vmachine.css";

// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';

import vmachines from "../../../assets/vmachine.json";
import Searcher from "../../utils/searcher/Searcher";
import Updater from "../../utils/updater/Updater";
import Table from "../../utils/table/Table";
const vmachineTableHead = [
  "",
  "Nơi đặt máy",
  "Địa chỉ",
  "Đầu mối liên hệ",
  "Ghi chú khác"
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
    <td>{item.place_name}</td>
    <td>{item.address}</td>
    <td>{item.contact}</td>
    <td className={item.note.length > 70 ? "td-note-sm" : "td-note-sm"}>
      {item.note}
    </td>
  </tr>
);


const Vmachine = () => {
  return (
    <div className="vouchers">
        <div className="vouchers__header">
            <Searcher label="Nhập tên VMachine ..." />
            <Updater />
        </div>
        <div className="vouchers__content">
          <Table
            limit="10"
            headData={vmachineTableHead}
            renderHeader={(item, index) => renderHead(item, index)}
            bodyData={vmachines}
            renderBody={(item, index) => renderBody(item, index)}
          />
        </div>
    </div>
  )
}

export default Vmachine