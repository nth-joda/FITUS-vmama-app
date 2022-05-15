import React, {useState, useEffect} from 'react'
import "./products.css";

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import products from "../../../assets/products.json";
import Searcher from "../../utils/searcher/Searcher";
import Updater from "../../utils/updater/Updater";
import Table from "../../utils/table/Table";

const productTableHead = [
  "Chọn",
  "Tên Sản phẩm",
  "Tên brand",
  "Giá tiền",
  "Chỉnh sửa",
];

const productTableHeadDelete = [
  "ID",
  "Tên sản phẩm",
  "Tên brand",
  "Giá tiền",
];

const renderBodyDelete = (item, index) => {
  return (<tr key={index}>
    <td>
      {item.id}
    </td>
    <td>{item.product_name}</td>
    <td>{item.brand_name}</td>
    <td>{item.cost}</td>
  </tr>)
};

const Products = () => {
  // ========= STATES
  const [checkedList, setCheckedList] = useState([]);
  const [winSize, setWinSize] =useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [isModalDelOpened, setIsModalDelOpened] = useState(false);
  const [isModalRefOpened, setIsModalRefOpened] = useState(false);
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);

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


  // ========= END OF STATES

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
  

  const handleListItemChange = (e, item, index) => {
    if(e.target.checked){
      if (checkedList.filter(x => x.id === item.id).length < 1)
        setCheckedList([...checkedList, item.id]);
    }
    else{
      if (checkedList.find(x => x.id === item.id))
        setCheckedList(...checkedList.filter(x => x.id !== item.id));
    }
  }

  const renderHead = (item, index) => { return item === "Chọn" && checkedList.length > 0 ? (<th key={index} className="Total-checked">{"[ "+checkedList.length+" ]"}</th>) : (<th key={index}>{item}</th>)};
  
  const renderBody = (item, index) => (
    <tr key={index} className={checkedList.includes(item.id)? "checked-row": ""}>
      <td>
      <Checkbox
        sx = {{ 
          '& .MuiSvgIcon-root': { fontSize: 28 },
          color: '#fff',
          '&.Mui-checked': {color: '#fff' }}
        }
        checked={checkedList.includes(item.id)}
        onChange={(e) => handleListItemChange(e, item, index)}
      />
      </td>
      <td>{item.product_name}</td>
      <td>{item.brand_name}</td>
      <td>{item.cost}</td>
      <td className="cta-edit">
        <IconButton aria-label="edit" size="large" sx={{color: "var(--color-main)", transform:"scale(1.1)"}}>
          <EditIcon />
        </IconButton>
      </td>
    </tr>
  );

  // =========== BUTTON CTA HANDLER:
  const handleOpenRefreshModal = () => {
    setIsModalRefOpened(true)
  }

  const handleOpenAddModal = () => {
    setIsModalAddOpened(true);
  }

  const handleOpenDeleteModal= () => {
    setIsModalDelOpened(true);
  }
  // ========== END BUTTON CTA HANDLER


  // ========== MODAL HANDLERS:
  // REFRESH MODAL:
  const handleCloseModalRef = () => setIsModalRefOpened(false);
  
  const handleRefreshProducts = () => {
    setCheckedList([]);
    setIsModalRefOpened(false);
  }

  // DELETE MODAL: 
  const handleCloseModalDel = () => setIsModalDelOpened(false);

  const handleDeleteProducts = () => {
    // TODO: send POST to DB
    setCheckedList([]);
    setIsModalDelOpened(false);
    // TODO: Toast msg: Đã xóa sản phẩm thành công
    // TODO: Re-GET products from DB
  }

  // Others: 

  const getSelectedList = () => {
    return products.filter(x => checkedList.includes(x.id));
  }



  // ========== END OF MODAL HANDLERS

  return (
    <div className="products">
        <div className="products__header">
            <Searcher label="Nhập tên sản phẩm ..." />
            <Updater isDelDisabled={checkedList.length < 1} isRefreshDisabled={checkedList.length < 1} catchRefresh={handleOpenRefreshModal} catchAdd={handleOpenAddModal} catchDelete={handleOpenDeleteModal} />
        </div>
        <div className="products__content">
          <Table
              limit="10"
              headData={productTableHead}
              renderHeader={(item, index) => renderHead(item, index)}
              bodyData={products}
              renderBody={(item, index) => renderBody(item, index)}/>
        </div>

        {/* REFRESH CONFIRM */}
        <Modal
          open={isModalRefOpened}
          onClose={handleCloseModalRef}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modal_Style}>
            <p className="modal__header modal__header-refresh">Bỏ chọn tất cả các sản phẩm ?</p>
            <div className="vouchers__content">
              <Table
                  headData={productTableHeadDelete}
                  renderHeader={(item, index) => renderHead(item, index)}
                  bodyData={getSelectedList}
                  renderBody={(item, index) => renderBodyDelete(item, index)}/>
            </div>
            <div className="modal__cta modal__cta-refresh">
              <Button className="btn btn-ondel btn-confirm" size="large" variant="contained" color="error" onClick={handleRefreshProducts}>
                Xác nhận bỏ chọn
              </Button>
              <Button className="btn btn-ondel btn-cancel" size="large" variant="contained" onClick={handleCloseModalRef}>
                Hủy bỏ thao tác
              </Button>
            </div>
          </Box>
        </Modal>

        {/* ADD MODAL */}
        <Modal>
          
        </Modal>

        {/* DELETE FORM */}
        <Modal
          open={isModalDelOpened}
          onClose={handleCloseModalDel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modal_Style}>
            <p className="modal__header modal__header-delete">Xóa {checkedList.length} sản phẩm sau:</p>
            <div className="vouchers__content">
              <Table
                  headData={productTableHeadDelete}
                  renderHeader={(item, index) => renderHead(item, index)}
                  bodyData={getSelectedList}
                  renderBody={(item, index) => renderBodyDelete(item, index)}/>
            </div>
            <div className="modal__cta modal__cta-delete">
              <Button className="btn btn-ondel btn-confirm" size="large" variant="contained" color="error" onClick={handleDeleteProducts}>
                Xác nhận xóa
              </Button>
              <Button className="btn btn-ondel btn-cancel" size="large" variant="contained" onClick={handleCloseModalDel}>
                Hủy bỏ thao tác
              </Button>
            </div>
          </Box>
          {/* <ChildModal />  */}
        </Modal> 
    </div>
  )
}

export default Products