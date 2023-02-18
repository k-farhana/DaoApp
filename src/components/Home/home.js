
import React from 'react';
import "../CSS/body.css";
// import image
import logo from '../images/isb-logo.png';
import block from "../images/blockchain-logo.png";
import nft from "../images/token1.jpeg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <>  
        <div className='logo-align'><img className='logo' src={logo} alt="logo" /></div>
        <div className='home-align'>
        <div className='direction-home'>
            <div className='card' >
                <img className='bl-logo' src={nft}/>
                <h4><u>NFT</u></h4>
            </div>
            <div className='card' onClick={() => navigate("/")}>
                <img className='bl-logo' src={block}/>
                <h4><u>DAO</u></h4>
            </div>
            <div className='card'>
            <h4><u>USE CASES</u></h4>
            </div>
        </div>
        </div>
    </>
  );
};
  
export default Navbar;