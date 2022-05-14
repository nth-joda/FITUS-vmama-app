import React from 'react'
import "./products.css";

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';

import products from "../../../assets/products.json";
import Searcher from "../../utils/searcher/Searcher";
import Updater from "../../utils/updater/Updater";
import Table from "../../utils/table/Table";
const productTableHead = [
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
    <td>{item.voucher_name}</td>
    <td>{item.brand_name}</td>
    <td>{item.cost}</td>
    <td className="cta-edit">
      <IconButton aria-label="edit" size="large" sx={{color: "var(--color-main)", transform:"scale(1.1)"}}>
        <EditIcon />
      </IconButton>
    </td>
  </tr>
);


const Products = () => {
  return (
    <div className="products">
        <div className="products__header">
            <Searcher label="Nhập tên sản phẩm ..." />
            <Updater />
        </div>
        <div className="products__content">
          <Table
              limit="10"
              headData={productTableHead}
              renderHeader={(item, index) => renderHead(item, index)}
              bodyData={products}
              renderBody={(item, index) => renderBody(item, index)}/>
        </div>
    </div>
  )
}

export default Products