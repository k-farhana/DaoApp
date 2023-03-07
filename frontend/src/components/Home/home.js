
import React from 'react';
import "../CSS/body.css";
// import image
import image from "../images/images.png";
import logo from '../images/isb-logo.png';
import block from "../images/blockchain-logo.png";
import nft from "../images/token1.jpeg";
import { useNavigate } from "react-router-dom";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from '../Navbar/NavbarElements';

const Navbar1 = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* <div className='logo-align'><img className='logo' src={logo} alt="logo" /></div> */}
            <Nav>
                <Bars />
                <NavMenu>
                    <div className='logo-align'><img className='logo' src={logo} alt="logo" /></div>
                    <div className='Text_product'>Digital Assets Labs</div>
                    <div className='top_align_nav'>
                        <div className='About_text'>About</div>
                        <div className='About_text'>Contact Us</div>
                    </div>
                </NavMenu>
            </Nav>
            <br /><br /><br />
            <div className='home-align'>
                <div className='direction-home'>
                    <div className='card' >
                        <img className='bl-logo' src={block} onClick={() => navigate("/dao")} />
                        <h4 onClick={() => navigate("/dao")}><u>DAO</u></h4>
                    </div>
                    <div className='card' >
                        <img className='bl-logo' src={nft} onClick={() => navigate("/nft")} />
                        <h4 onClick={() => navigate("/nft")}><u>NFT</u></h4>
                    </div>
                    <div className='card' >
                        <img className='bl-logo' src={image} />
                        <h4><u>Metaverse For Learning</u></h4>
                    </div>
                    <div className='card'>
                        <h4><u>Blockchain Impact</u></h4>
                        <h4><u>Use-Cases</u></h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar1;