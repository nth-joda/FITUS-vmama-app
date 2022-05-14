import React, { useEffect } from 'react'
import "./vouchers.css";

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import vList from "../../../assets/vouchers.json";
import Searcher from "../../utils/searcher/Searcher";
import Updater from "../../utils/updater/Updater";
import Table from "../../utils/table/Table";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
};


const voucherTableHead = [
  "Chọn",
  "Tên voucher",
  "Tên brand",
  "Còn lại",
  "Đã đổi",
  "Chỉnh sửa",
];




const Vouchers = () => {
  
  const [open, setOpen] = React.useState(false);
  const [winSize, setWinSize] = React.useState(getWindowDimensions());
  const [winPer, setWinPer] = React.useState("30%");
  const [checkedList, setCheckedList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);

  const renderHead = (item, index) => {
    if(item === "Chọn" && checkedList.length > 0) return  (<th key={index}>{item}</th>) ;
    <th className={index === 3 || index === 4 ? "centering" : ""} key={index}>{item}</th>
  };

  const renderBody = (item, index, curPage, limit) => {
    setCurrentPage(curPage);
    return (<tr key={index}>
      <td>
        <Checkbox
          sx = {{ 
            '& .MuiSvgIcon-root': { fontSize: 28 },
            color: '#fff',
            '&.Mui-checked': {color: '#fff' }}}
          checked={ checkedList.filter(x => x === curPage*limit + index).length >0 ? true : false }
          onChange={(e) => {
            const checkedID = (curPage*limit + index);
            checkedList.filter(x => x === checkedID).length <= 0 ? setCheckedList([...checkedList, checkedID]) : setCheckedList([...checkedList.filter(x => x !== checkedID)]);
            }
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
    </tr>)
  };

  useEffect(() =>{
    if(winSize.width < 400){
      setWinPer("90%");
    }

    else if(winSize.width < 800 ){
      setWinPer("60%");
    }
    else setWinPer("50%");
  }, [winSize.width]);

  useEffect(() =>{setCheckedList([])}, [currentPage])


  const handleOpen = () => {
    setOpen(true);

  };

  const handleDelete = () => {
    console.log("check list:", checkedList);
  }
  const handleClose = () => setOpen(false);

  const modal_Style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: winPer ,
    bgcolor: 'background.paper',
    border: '2px solid var(--color-main)',
    borderRadius: '1rem',
    boxShadow: '24 var(--color-background-content)',
    p: 4,
  };

  return (
    <div className="vouchers">
        <div className="vouchers__header">
            <Searcher label="Nhập tên voucher ..." />
            <Updater catchAdd={handleOpen} catchDelete={handleDelete}/>
        </div>
        <div className="vouchers__content">
          <Table
              limit="10"
              headData={voucherTableHead}
              renderHeader={(item, index) => renderHead(item, index)}
              bodyData={vList}
              renderBody={(item, index, curPage, limit) => renderBody(item, index, curPage, limit)}/>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modal_Style}>
            <p className="modal__header">Thêm voucher</p>
            <form>
              <div className="modal__form-field">
                <label htmlFor="voucher_name">Tên voucher</label>
                <TextField
                  required
                  id="voucher_name"
                  label="Bắt buộc"
                  variant="filled"
                />
              </div>

              <div className="modal__form-field">
                <label htmlFor="brand_name">Tên Brand</label>
                <TextField
                  required
                  id="brand_name"
                  label="Bắt buộc"
                  variant="filled"
                />
              </div>

              <div className="modal__form-field">
                <label htmlFor="amount">Số lượng</label>
                <TextField
                  required
                  id="amount"
                  type="number"
                  label="Bắt buộc"
                  variant="filled"
                />
              </div>
              <button className="submit-add" >Thêm</button>
            </form>
          </Box>
          {/* <ChildModal />  */}
        </Modal>
    </div>
  )
}

export default Vouchers