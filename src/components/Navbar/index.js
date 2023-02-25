
import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import "../CSS/body.css";
// import image
import logo from '../images/isb-logo.png';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <div className='Text_product'>Digital Assets Labs</div>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;
