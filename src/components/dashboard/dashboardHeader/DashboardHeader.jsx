import React, {useRef} from 'react'
import "./dashboardHeader.css"
import HeaderDropdown from './headerDropdown/HeaderDropdown'
import PersonIcon from '@mui/icons-material/Person';

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener("mousedown", (e) => {
    // user clicks toggler
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle("show");
      // const dropdown_el = document.getElementById("dashboardHeader__dropdown");
      // dropdown_el.classList.toggle("show");
      // console.log("show dropdown: ", dropdown_el.classList);
    } else {
      // user clicks outside toggle and content
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove("show");
        // const dropdown_el_hide = document.getElementById("dashboardHeader__dropdown");
        // dropdown_el_hide.classList.remove("show");
        // console.log("hide dd: ", dropdown_el_hide.classList);
      }
    }
  });
};

const DashboardHeader = () => {
  const dropdown_toggle_el = useRef(null);
  const dropdown_content_el = useRef(null);
  clickOutsideRef(dropdown_content_el, dropdown_toggle_el);

  return (
    <div className="dashboardHeader">
        <div className="dashboardHeader__logo">
            VMAMA
        </div>
        <div className="dashboardHeader__menu">
          <button ref={dropdown_toggle_el} className="dashboardHeader__menu-profile">
              <PersonIcon className='profile-avt'></PersonIcon>
              <div className="profile-name">Nguyen Van A</div>
          </button>
          <div ref={dropdown_content_el} id="dashboardHeader__dropdown">
            <HeaderDropdown></HeaderDropdown>
          </div>
        </div>
        
        
    </div>
  )
}

export default DashboardHeader