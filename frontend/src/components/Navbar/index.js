
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
import sap from "../images/Sap.png";
import asset from "../images/asset.png";
import venture from "../images/venture.png";



const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <div className='top_align_nav1'>
          <div className='logo-align'><img className='logo' src={logo} alt="logo" /></div>
          {/* <div className='Text_product'>Digital Assets Labs</div> */}
          <img className='logo1' src={asset} />
          <img className='logo2' src={venture} />
        </div>
        <div className='top_align_nav'>
          <div className='pow_text'>Powered by:</div>
          <img className='About_logo' src={sap} />
        </div>
      </Nav>
    </>
  );
};

export default Navbar;
