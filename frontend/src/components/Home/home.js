
import React from 'react';
import "../CSS/body.css";
// import image
import image from "../images/images.png";
import logo from '../images/isb-logo.png';
import block from "../images/blockchain-logo.png";
import nft from "../images/token1.jpeg";
import sap from "../images/Sap.png";
import asset from "../images/asset.png";
import { useNavigate } from "react-router-dom";
import venture from "../images/venture.png";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from '../Navbar/NavbarElements';
import {
    Button,
} from "react-bootstrap";

const Navbar1 = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* <div className='logo-align'><img className='logo' src={logo} alt="logo" /></div> */}
            <Nav>
                <Bars /> 
                <div className='top_align_nav1'>
                    <div className='logo-align'><img className='logo' src={logo} alt="logo" /></div>
                    {/* <div className='Text_product'>Digital Assets Labs</div> */}
                    <img className='logo1' src={asset} />
                    <img className='logo2' src={venture} />
                </div>
                <div className='top_align_nav'>
                    <div className='About_text'>About</div>
                    <div className='About_text'><span>Contact Us</span></div> 
                    <div className='About_text'>Refrence Manual</div>   
                    <div className='About_text'>Team</div> 
                    <Button
                            className="btn_back"
                            
                        >
                            Register
                    </Button>
                    <div className='pow_text'>Powered by:</div>
                    <img className='About_logo' src={sap} />
                </div>
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