import React, { useState, useEffect } from "react";
import axios from "axios";
import "./products.css";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import DATA from "../../../assets/api/data.json";
import Searcher from "../../utils/searcher/Searcher";
import Updater from "../../utils/updater/Updater";
import Table from "../../utils/table/Table";

const URL = `https://rpa-voucher-exchange.herokuapp.com`;
const endpoint = `/api/v1/products?page=1`;
const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6IjQiLCJwcm92aWRlcl9pZCI6IjQiLCJpc3MiOiJnaXRodWIuY29tL250aWtob2EiLCJleHAiOjE2NTM1MzAyMjQsImlhdCI6MTY1MjkyNTQyNH0.8qNbWY_zOisHYM64iMb2z75nbx37Z59TkNsZMD929Q8`;
const config = {
  headers: {
    Authorization: token,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Content-Type": "application/json",
  },
};

// const DB_Headers = [
//   "ID",
//   "CreatedAt",
//   "UpdatedAt",
//   "DeletedAt",
//   "ProductName",
//   "ProviderID",
// ];

const productTableHead = ["Chọn", "Tên Sản phẩm", "Chỉnh sửa"];
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
  {
    value: "VND",
    label: "đ",
  },
];

const productTableHeadDelete = ["ID", "Tên sản phẩm"];

const renderBodyDelete = (item, index) => {
  return (
    <tr key={index}>
      <td>{item.ID}</td>
      <td>{item.ProductName}</td>
    </tr>
  );
};

const Products = () => {
  // ========= STATES
  const [checkedList, setCheckedList] = useState([]);
  const [chosenEditItem, setChosenEditItem] = useState();
  const [winSize, setWinSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isModalDelOpened, setIsModalDelOpened] = useState(false);
  const [isModalRefOpened, setIsModalRefOpened] = useState(false);
  const [isModalAddOpened, setIsModalAddOpened] = useState(false);

  const [currency, setCurrency] = React.useState("VND");

  const [winPer, setWinPer] = useState("40%");

  // DATA
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // TODO: SEND REQUEST to get All products
    // if status == 200 : setProducts
    axios
      .get(URL + endpoint, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console("err: ", err));
    setProducts(DATA.data.products);
  }, []);

  const setDimension = () => {
    setWinSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);
    if (winSize.width < 450) {
      setWinPer("90%");
    } else if (winSize.width < 850) {
      setWinPer("80%");
    } else setWinPer("50%");

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [winSize.width]);

  // ========= END OF STATES

  const modal_Style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: winPer,
    bgcolor: "background.paper",
    border: "2px solid var(--color-main)",
    borderRadius: "1rem",
    boxShadow: "24 var(--color-background-content)",
    p: 4,
  };

  const handleListItemChange = (e, item, index) => {
    if (e.target.checked) {
      if (checkedList.filter((x) => x === item.ID).length < 1)
        setCheckedList([...checkedList, item.ID]);
    } else {
      if (checkedList.filter((x) => x === item.ID).length > 0)
        setCheckedList([...checkedList.filter((x) => x !== item.ID)]);
    }
  };

  const renderHead = (item, index) => {
    return item === "Chọn" && checkedList.length > 0 ? (
      <th key={index} className="Total-checked">
        {"[ " + checkedList.length + " ]"}
      </th>
    ) : (
      <th key={index}>{item}</th>
    );
  };

  const renderBody = (item, index) => {
    return (
      <tr key={index} className={checkedList.includes(item.ID) ? "chosen" : ""}>
        <td>
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 28 },
              color: "#fff",
              "&.Mui-checked": { color: "#fff" },
            }}
            checked={
              checkedList.filter((x) => x === item.ID).length > 0 ? true : false
            }
            onChange={(e) => handleListItemChange(e, item, index)}
          />
        </td>
        <td>{item.ProductName}</td>
        <td className="cta-edit">
          <IconButton
            aria-label="edit"
            size="large"
            sx={{ color: "var(--color-main)", transform: "scale(1.1)" }}
            onClick={() => setChosenEditItem(item.ID)}
          >
            <EditIcon />
          </IconButton>
        </td>
      </tr>
    );
  };

  // =========== BUTTON CTA HANDLER:
  const handleOpenRefreshModal = () => {
    setIsModalRefOpened(true);
  };

  const handleOpenAddModal = () => {
    setIsModalAddOpened(true);
  };

  const handleOpenDeleteModal = () => {
    setIsModalDelOpened(true);
  };
  // ========== END BUTTON CTA HANDLER

  // ========== MODAL HANDLERS:
  // REFRESH MODAL:
  const handleCloseModalRef = () => setIsModalRefOpened(false);

  const handleRefreshProducts = () => {
    setCheckedList([]);
    setIsModalRefOpened(false);
  };

  // ADD MODAL:
  const handleCloseModalAdd = () => setIsModalAddOpened(false);

  // DELETE MODAL:
  const handleCloseModalDel = () => setIsModalDelOpened(false);

  const handleDeleteProducts = () => {
    // TODO: send POST to DB
    setCheckedList([]);
    setIsModalDelOpened(false);
    // TODO: Toast msg: Đã xóa sản phẩm thành công
    // TODO: Re-GET products from DB
  };

  // EDIT MODAL:
  const handleCloseModalEdit = () => setChosenEditItem();

  // Others:

  const getSelectedList = () => {
    return products.filter((x) => checkedList.includes(x.ID));
  };

  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };

  // ========== END OF MODAL HANDLERS

  return (
    <div className="products">
      <div className="products__header">
        <Searcher label="Nhập tên sản phẩm ..." />
        <Updater
          isDelDisabled={checkedList.length < 1}
          isRefreshDisabled={checkedList.length < 1}
          catchRefresh={handleOpenRefreshModal}
          catchAdd={handleOpenAddModal}
          catchDelete={handleOpenDeleteModal}
        />
      </div>
      <div className="products__content">
        <Table
          limit="10"
          headData={productTableHead}
          renderHeader={(item, index) => renderHead(item, index)}
          bodyData={products}
          renderBody={(item, index) => renderBody(item, index)}
        />
      </div>

      {/* REFRESH CONFIRM */}
      <Modal
        open={isModalRefOpened}
        onClose={handleCloseModalRef}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal_Style}>
          <p className="modal__header modal__header-refresh">
            Bỏ chọn tất cả các sản phẩm ?
          </p>
          <div className="vouchers__content">
            <Table
              headData={productTableHeadDelete}
              renderHeader={(item, index) => renderHead(item, index)}
              bodyData={getSelectedList}
              renderBody={(item, index) => renderBodyDelete(item, index)}
            />
          </div>
          <div className="modal__cta modal__cta-refresh">
            <Button
              className="btn btn-ondel btn-confirm"
              size="large"
              variant="contained"
              color="error"
              onClick={handleRefreshProducts}
            >
              Xác nhận bỏ chọn
            </Button>
            <Button
              className="btn btn-ondel btn-cancel"
              size="large"
              variant="contained"
              onClick={handleCloseModalRef}
            >
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
          <p className="modal__header modal__header-add">Thêm sản phẩm</p>
          <div className="product__content">
            <form>
              <div className="modal__form-field">
                <label htmlFor="voucher_name">Tên sản phẩm</label>
                <TextField
                  required
                  id="voucher_name"
                  label="Bắt buộc"
                  variant="filled"
                />
              </div>
              <div className="modal__cta modal__cta-add">
                <Button
                  className="btn btn-ondel btn-confirm"
                  size="large"
                  variant="contained"
                  color="success"
                >
                  Xác nhận Thêm
                </Button>
                <Button
                  className="btn btn-ondel btn-cancel"
                  size="large"
                  variant="contained"
                  onClick={handleCloseModalAdd}
                >
                  Hủy bỏ thao tác
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>

      {/* DELETE FORM */}
      <Modal
        open={isModalDelOpened}
        onClose={handleCloseModalDel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal_Style}>
          <p className="modal__header modal__header-delete">
            Xóa {checkedList.length} sản phẩm sau:
          </p>
          <div className="products__content">
            <Table
              headData={productTableHeadDelete}
              renderHeader={(item, index) => renderHead(item, index)}
              bodyData={getSelectedList}
              renderBody={(item, index) => renderBodyDelete(item, index)}
            />
          </div>
          <div className="modal__cta modal__cta-delete">
            <Button
              className="btn btn-ondel btn-confirm"
              size="large"
              variant="contained"
              color="error"
              onClick={handleDeleteProducts}
            >
              Xác nhận xóa
            </Button>
            <Button
              className="btn btn-ondel btn-cancel"
              size="large"
              variant="contained"
              onClick={handleCloseModalDel}
            >
              Hủy bỏ thao tác
            </Button>
          </div>
        </Box>
        {/* <ChildModal />  */}
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        open={chosenEditItem ? true : false}
        onClose={handleCloseModalEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal_Style}>
          <p className="modal__header modal__header-edit">Chỉnh sửa sản phẩm</p>
          <div className="products__content">
            <form>
              <div className="modal__form-field">
                <label htmlFor="voucher_name">Tên sản phẩm</label>
                <TextField
                  required
                  id="voucher_name"
                  label="Bắt buộc"
                  variant="filled"
                  defaultValue={
                    products.filter((x) => x.ID === chosenEditItem).length > 0
                      ? products.filter((x) => x.ID === chosenEditItem)[0]
                          .ProductName
                      : ""
                  }
                />
              </div>
              <div className="modal__cta modal__cta-edit">
                <Button
                  className="btn btn-ondel btn-confirm"
                  size="large"
                  variant="contained"
                  color="success"
                >
                  Xác nhận Sửa
                </Button>
                <Button
                  className="btn btn-ondel btn-cancel"
                  size="large"
                  variant="contained"
                  onClick={handleCloseModalEdit}
                >
                  Hủy bỏ thao tác
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Products;
