import React from 'react'
import "./page404.css"
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import logo_404 from "../../../assets/khue di cho 1.png"

function page404() {
  return (
    <div>
      <DashboardHeader />
      <div className="page404">
        <div className="page404_content">
          <p className="header_404"> 404</p>
          <p className="header_404_1">PAGE NOT FOUND</p>
          <div className="page404_form">
            <p>Trang bạn đang tìm kiếm hiện không khả dụng. </p>
            <p>Bạn có muốn quay lại trang chủ không?</p>
          </div>
          <button className='btn_404'> Trang Chủ</button>
        </div>
        <div className="page404_logo">
          <img
            className="logo_404"
            src={logo_404}
            alt="logo 404"
          />
          
        </div>
       
      </div>
    </div>
  );
}

export default page404;