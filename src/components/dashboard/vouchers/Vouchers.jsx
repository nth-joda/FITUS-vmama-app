import React, { useEffect } from 'react'
import "./vouchers.css";

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

const voucherTableHeadDelete = [
  "ID",
  "Tên voucher",
  "Tên brand",
  "Còn lại",
  "Đã đổi",
];

const renderBodyDelete = (item, index) => {
  return (<tr key={index}>
    <td>
      {item.id}
    </td>
    <td>{item.voucher_name}</td>
    <td>{item.brand_name}</td>
    <td className={item.left > 0 ? "centering safe-txt" : "centering danger-txt"}>{item.left}</td>
    <td className="danger-txt centering">{item.used}</td>
  </tr>)
};




const Vouchers = () => {
  
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [winSize, setWinSize] = React.useState(getWindowDimensions());
  const [winPer, setWinPer] = React.useState("30%");
  const [checkedList, setCheckedList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);

  const renderHead = (item, index) => { 
    if(item === "Chọn" && checkedList.length > 0) return  (<th className="white-txt chosen_num" key={index}>{"[ "+checkedList.length+" ]"}</th>)
    else return (<th className={index === 3 || index === 4 ? "white-txt centering" : "white-txt"} key={index}>{item}</th>);
  };

  const renderBody = (item, index, curPage, limit) => {
    setCurrentPage(curPage);
  return (<tr className={checkedList.includes(curPage*limit + index + 1) ? "chosen" :""} key={index}>
      <td>
        <Checkbox
          sx = {{ 
            '& .MuiSvgIcon-root': { fontSize: 28 },
            color: '#fff',
            '&.Mui-checked': {color: '#fff' }}}
          checked={ checkedList.filter(x => x === curPage*limit + index + 1).length >0 ? true : false }
          onChange={(e) => {
            const checkedID = (curPage*limit + index +1);
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


  const handleAdd = () => {
    setOpenAdd(true);

  };

  const handleDelete = () => {
    setOpenDelete(true);
  }
  const handleCloseAdd = () => setOpenAdd(false);
  const handleCloseDelete = () => setOpenDelete(false);

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

  const getSelectedList = () => {
    let sList = [];
    sList = vList.filter(x => checkedList.includes(x.id));
    console.log(sList, checkedList)
    return sList
  }

  return (
    <div className="vouchers">
        <div className="vouchers__header">
            <Searcher label="Nhập tên voucher ..." />
            <Updater catchAdd={handleAdd} catchDelete={handleDelete}/>
        </div>
        <div className="vouchers__content">
          <Table
              limit="10"
              headData={voucherTableHead}
              renderHeader={(item, index) => renderHead(item, index)}
              bodyData={vList}
              renderBody={(item, index, curPage, limit) => renderBody(item, index, curPage, limit)}/>
        </div>
        {/* ADD FORM:  */}
        <Modal
          open={openAdd}
          onClose={handleCloseAdd}
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

        {/* DELETE FORM */}
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modal_Style}>
            <p className="modal__header">Xóa {checkedList.length} vouchers sau:</p>
            <div className="vouchers__content">
              <Table
                  headData={voucherTableHeadDelete}
                  renderHeader={(item, index) => renderHead(item, index)}
                  bodyData={getSelectedList}
                  renderBody={(item, index, curPage, limit) => renderBodyDelete(item, index, curPage, limit)}/>
            </div>
            <div className="delete-cta">
              <Button className="btn btn-ondel btn-confirm" size="large" variant="contained" color="error">
                Xác nhận xóa
              </Button>
              <Button className="btn btn-ondel btn-cancel" size="large" variant="contained">
                Hủy bỏ thao tác
              </Button>
            </div>
          </Box>
          {/* <ChildModal />  */}
        </Modal>
    </div>
  )
}

export default Vouchers