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



// const ChildModal = () => {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button onClick={handleOpen}>Open Child Modal</Button>
//       <Modal
//         hideBackdrop
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Box sx={{ ...modal_Style, width: 200 }}>
//           <h2 id="child-modal-title">Xác nhận thêm voucher</h2>
//           <p id="child-modal-description">
//             Thông tin voucher sẽ thêm ngay sau xác nhận: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//           </p>
//           <Button onClick={handleClose}>Quay về</Button>
//           <Button onClick={handleClose}>Xác nhận thêm</Button>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// }

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

  const [open, setOpen] = React.useState(false);
  const [winSize, setWinSize] = React.useState(getWindowDimensions());
  const [ winPer, setWinPer] = React.useState("30%");

  useEffect(() =>{
    if(winSize.width < 400){
      setWinPer("90%");
    }

    else if(winSize.width < 800 ){
      setWinPer("60%");
    }
    else setWinPer("50%");
  }, [winSize.width]);

  const handleOpen = () => {
    setOpen(true);

  };
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
            <Updater catchAdd={handleOpen}/>
        </div>
        <div className="vouchers__content">
          <Table
              limit="10"
              headData={voucherTableHead}
              renderHeader={(item, index) => renderHead(item, index)}
              bodyData={vList}
              renderBody={(item, index) => renderBody(item, index)}/>
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