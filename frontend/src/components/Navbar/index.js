
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
import logo from '../images/isb-logo.png';

  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <div className='logo-align'><img className='logo' src={logo} alt="logo" /></div>
          <div className='Text_product1'>Digital Assets Labs</div>
          <div className='Dow_text'>DAO</div>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;
