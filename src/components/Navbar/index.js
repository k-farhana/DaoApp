
import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to='/user' activeStyle>
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