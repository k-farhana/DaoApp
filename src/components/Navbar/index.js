
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
          <NavLink to='/' activeStyle>
            User
          </NavLink>
          <NavLink to='/admin' activeStyle>
            Admin
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;
