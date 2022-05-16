import React, {useState, useEffect} from 'react'
import "./vmachine.css";

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import vmachines from "../../../assets/vmachine.json";
import Searcher from "../../utils/searcher/Searcher";
import Updater from "../../utils/updater/Updater";
import Table from "../../utils/table/Table";
const vmachineTableHead = [
  "Chọn",
  "Nơi đặt máy",
  "Địa chỉ",
  "Đầu mối liên hệ",
  "Ghi chú khác",
  "Chỉnh sửa"
];

const vmachineTableHeadDelete = [
  "ID",
  "Nơi đặt máy",
  "Địa chỉ",
  "Đầu mối liên hệ",
  "Ghi chú khác"
];




const renderBodyDelete = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.place_name}</td>
    <td>{item.address}</td>
    <td>{item.contact}</td>
    <td className={item.note.length > 70 ? "td-note-sm" : "td-note-sm"}>
      {item.note}
    </td>
  </tr>
)


const Vmachine = () => {
  // STATES:
  const [checkedList, setCheckedList] = useState([]);
  const [chosenEditItem, setChosenEditItem] = useState();
  const [isModalRefOpened, setIsModalRefOpened] = useState(false);
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);
  const [isModalDelOpened, setIsModalDelOpened] = useState(false);

  const [winSize, setWinSize] =useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [winPer, setWinPer] = useState("40%");

  const setDimension = () => {
    setWinSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() =>{
    window.addEventListener('resize', setDimension);
    if(winSize.width < 450){
      setWinPer("90%");
    }

    else if(winSize.width < 850 ){
      setWinPer("80%");
    }
    else setWinPer("50%");

    return(() => {
      window.removeEventListener('resize', setDimension);
    })

  }, [winSize.width]);

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
  //HANDLERS:

  // ADD MODAL:
  const handleCloseModalAdd = () => setIsModalAddOpened(false);

  // REFRESH MODAL:
  const handleRefresh = () => {
    setCheckedList([]);
    setIsModalRefOpened(false);
  }

  const handleCloseModalRef = () => setIsModalRefOpened(false);

  // DELETE MODAL:
  const handleCloseModalDel = () => setIsModalDelOpened(false);

  // EDIT MODAL
  const handleCloseModalEdit = () => setChosenEditItem();

  // Others: 
  const getSelectedList = () => {
    return vmachines.filter( x => checkedList.includes(x.id));
  }

  const handleCheckItem = (e, item, index) => {
    if(e.target.checked){
      if (checkedList.filter(x => x === item.id).length < 1)
        setCheckedList([...checkedList, item.id]);
    }
    else{
      if (checkedList.find(x => x === item.id))
        setCheckedList([...checkedList.filter(x => x !== item.id)]);
    }
  }


  const renderHead = (item, index) => {return (item !== "Chọn" || checkedList.length < 1)  ? <th key={index}>{item}</th> : <th className="centering" key={index}>{"[ " +checkedList.length+ " ]"}</th>};
  const renderBody = (item, index) => (
    <tr className={checkedList.includes(item.id) ? "chosen" : ""} key={index}>
      <td>
        <Checkbox
          sx = {{ 
            '& .MuiSvgIcon-root': { fontSize: 28 },
            color: '#fff',
            '&.Mui-checked': {color: '#fff' }}
          }
          checked={checkedList.includes(item.id)}
          onChange={(e) => handleCheckItem(e, item, index)}
        />
      </td>
      <td>{item.place_name}</td>
      <td>{item.address}</td>
      <td>{item.contact}</td>
      <td className={item.note.length > 70 ? "td-note-sm" : "td-note-sm"}>
        {item.note}
      </td>
      <td>
        <IconButton aria-label="edit" size="large" sx={{color: "var(--color-main)", transform:"scale(1.1)"}} onClick={() => setChosenEditItem(item)}>
          <EditIcon></EditIcon>
        </IconButton>
      </td>
    </tr>
  );

  return (
    <div className="vmachines">
        <div className="vmachines__header">
            <Searcher label="Nhập tên VMachine ..." />
            <Updater
              isRefreshDisabled={checkedList.length < 1}
              isDelDisabled={checkedList.length < 1}
              catchRefresh={() => setIsModalRefOpened(true)}
              catchAdd={() => setIsModalAddOpened(true)}
              catchDelete={() => setIsModalDelOpened(true)}
            />
        </div>
        <div className="vmachines__content">
          <Table
            limit="10"
            headData={vmachineTableHead}
            renderHeader={(item, index) => renderHead(item, index)}
            bodyData={vmachines}
            renderBody={(item, index) => renderBody(item, index)}
          />
        </div>

        {/* MODAL REFRESH */}
        <Modal
          open={isModalRefOpened}
          onClose={handleCloseModalRef}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modal_Style}>
            <p className="modal__header modal__header-refresh">Bỏ chọn tất cả các sản phẩm ?</p>
            <div className="modal__content">
              <Table
                  headData={vmachineTableHeadDelete}
                  renderHeader={(item, index) => renderHead(item, index)}
                  bodyData={getSelectedList}
                  renderBody={(item, index) => renderBodyDelete(item, index)}/>
            </div>
            <div className="modal__cta modal__cta-refresh">
              <Button className="btn btn-ondel btn-confirm" size="large" variant="contained" color="error" onClick={handleRefresh}>
                Xác nhận bỏ chọn
              </Button>
              <Button className="btn btn-ondel btn-cancel" size="large" variant="contained" onClick={handleCloseModalRef}>
                Hủy bỏ thao tác
              </Button>
            </div>
          </Box>
        </Modal>

        {/* ADD MODAL */}
        <Modal
          open={isModalAddOpened}
          onClose={handleCloseModalAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modal_Style}>
            <p className="modal__header modal__header-add">Thêm Vmachine mới</p>
            <div className="modal__content">
              <form>
                <div className="modal__form-field">
                  <label htmlFor="place_name">Nơi đặt máy</label>
                  <TextField
                    required
                    id="voucher_name"
                    label="Bắt buộc"
                    variant="filled"
                  />
                </div>

                <div className="modal__form-field">
                  <label htmlFor="address">Địa chỉ</label>
                  <TextField
                    required
                    id="address"
                    label="Bắt buộc"
                    variant="filled"
                  />
                </div>
                <div className="modal__form-field">
                  <label htmlFor="contact">Đầu mối liên hệ</label>
                  <TextField
                    id="contact"
                    label="Liên hệ"
                    variant="filled"
                  >
                  </TextField>
                </div>

                <div className="modal__form-field">
                  <label htmlFor="note">Ghi chú khác</label>
                  <TextField
                    id="note"
                    label="Bắt buộc"
                    variant="filled"
                    maxRows={4}
                    multiline
                  />
                </div>
              </form>
            </div>
            <div className="modal__cta modal__cta-add">
              <Button className="btn btn-ondel btn-confirm" size="large" variant="contained" color="success">
                Xác nhận thêm
              </Button>
              <Button className="btn btn-ondel btn-cancel" size="large" variant="contained" onClick={handleCloseModalAdd}>
                Hủy bỏ thao tác
              </Button>
            </div>
          </Box>
        </Modal>

        {/* DELETE MODAL */}
        <Modal
          open={isModalDelOpened}
          onClose={handleCloseModalDel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modal_Style}>
            <p className="modal__header modal__header-delete">Xoá [ {checkedList.length} ] Vmachines sau:</p>
            <div className="modal__content">
              <Table
                  headData={vmachineTableHeadDelete}
                  renderHeader={(item, index) => renderHead(item, index)}
                  bodyData={getSelectedList}
                  renderBody={(item, index) => renderBodyDelete(item, index)}/>
            </div>
            <div className="modal__cta modal__cta-delete">
              <Button className="btn btn-ondel btn-confirm" size="large" variant="contained" color="error">
                Xác nhận bỏ chọn
              </Button>
              <Button className="btn btn-ondel btn-cancel" size="large" variant="contained" onClick={handleCloseModalDel}>
                Hủy bỏ thao tác
              </Button>
            </div>
          </Box>
        </Modal>

        {/* EDIT MODAL */}
        <Modal
          open={chosenEditItem ? true : false}
          onClose={handleCloseModalEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modal_Style}>
            <p className="modal__header modal__header-edit">Chỉnh sửa Vmachine</p>
            <div className="modal__content">
              <form>
                <div className="modal__form-field">
                  <label htmlFor="place_name">Nơi đặt máy</label>
                  <TextField
                    required
                    id="voucher_name"
                    label="Bắt buộc"
                    variant="filled"
                    defaultValue={vmachines.filter(x => x === chosenEditItem).length > 0 ? vmachines.filter(x => x === chosenEditItem)[0].place_name : ""  }
                  />
                </div>

                <div className="modal__form-field">
                  <label htmlFor="address">Địa chỉ</label>
                  <TextField
                    required
                    id="address"
                    label="Bắt buộc"
                    variant="filled"
                    defaultValue={vmachines.filter(x => x === chosenEditItem).length > 0 ? vmachines.filter(x => x === chosenEditItem)[0].address : ""  }

                  />
                </div>
                <div className="modal__form-field">
                  <label htmlFor="contact">Đầu mối liên hệ</label>
                  <TextField
                    id="contact"
                    label="Liên hệ"
                    variant="filled"
                    defaultValue={vmachines.filter(x => x === chosenEditItem).length > 0 ? vmachines.filter(x => x === chosenEditItem)[0].contact : ""  }

                  >
                  </TextField>
                </div>

                <div className="modal__form-field">
                  <label htmlFor="note">Ghi chú khác</label>
                  <TextField
                    id="note"
                    multiline
                    label="Bắt buộc"
                    variant="filled"
                    maxRows={4}
                    defaultValue={vmachines.filter(x => x === chosenEditItem).length > 0 ? vmachines.filter(x => x === chosenEditItem)[0].note : ""  }

                  />
                </div>
              </form>
            </div>
            <div className="modal__cta modal__cta-edit">
              <Button className="btn btn-ondel btn-confirm" size="large" variant="contained" color="success">
                Xác nhận sửa
              </Button>
              <Button className="btn btn-ondel btn-cancel" size="large" variant="contained" onClick={handleCloseModalEdit}>
                Hủy bỏ thao tác
              </Button>
            </div>
          </Box>
        </Modal>
    </div>
  )
}

export default Vmachine


