
import React from 'react';
import {
    Button,
    Tabs,
    Tab,
    Row,
    Col,
    Card,
} from "react-bootstrap";
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
                </NavMenu>
            </Nav>
            <br /><br /><br />
            <div className='home-align'>
                <div className='direction-home'>
                    <div className='card' >
                        <h4><u>Steps to create NFT</u></h4>
                        <div className='nft_text'>
                            <div className="page2_text_step"> <p><strong>Step 1</strong>&nbsp;&nbsp;&nbsp;&#62;&nbsp;&nbsp;&nbsp;connect your metamask wallet</p></div>
                            <div className="page2_text_step"> <p><strong>Step 2</strong>&nbsp;&nbsp;&nbsp;&#62;&nbsp;&nbsp;&nbsp;Accept and sign the transaction</p></div>
                            <div className="page2_text_step"> <p><strong>Step 3</strong>&nbsp;&nbsp;&nbsp;&#62;&nbsp;&nbsp;&nbsp;click on the profile icon on top-right and click on create</p></div>
                            <div className="page2_text_step"> <p><strong>Step 4</strong>&nbsp;&nbsp;&nbsp;&#62;&nbsp;&nbsp;&nbsp;Upload a video/image of your choice and fill the form</p></div>
                            <div className="page2_text_step"> <p><strong>Step 5</strong>&nbsp;&nbsp;&nbsp;&#62;&nbsp;&nbsp;&nbsp;<a href="https://opensea.io/">click Here/or on Create NFT</a></p></div>
                        </div>
                        <Button
                            // code for blue button
                            className="btn_back"
                            onClick={() => window.open('https://opensea.io/')}
                        >
                            Create NFT
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar1;