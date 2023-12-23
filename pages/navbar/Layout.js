import { Outlet,Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import './layout.css'
import '../img/icon/user.png';
import '../img/icon/basket.png';
import '../img/icon/heart.png';
import '../img/icon/exit.png';
import '../img/icon/settings.png';
import '../img/icon/message.png';
import '../img/icon/bell.png';
import SignIn from "../signin/signin"
import SignUp from "../signup/signup";

export default function Layout(){

    const ShowNav = () => {
        return (
            <div className="ShowNav" id="ShowNav">
                <button id="CloseShowNav" onClick={()=> {
                        document.getElementById('ShowNav').style.display = "none"
                    }}>&#9587;</button>
                <ul>
                    <li>
                        <Link to='/' onClick={()=> {
                        document.getElementById('ShowNav').style.display = "none"
                    }}>Home</Link>
                    </li>
                    <li>
                        <Link to='/product' onClick={()=> {
                        document.getElementById('ShowNav').style.display = "none"
                    }}>Product</Link>
                    </li>
                    <li>
                        <Link to='/contact' onClick={()=> {
                        document.getElementById('ShowNav').style.display = "none"
                    }}>Contact</Link>
                    </li>
                    <li>
                        <Link to='/about' onClick={()=> {
                        document.getElementById('ShowNav').style.display = "none"
                    }}>About</Link>
                    </li>                    
                </ul>
                <ul className="ShowNavTwo">
                    <button onClick={()=> {
                        document.getElementById('ShowNav').style.display = "none"
                        document.getElementById("signin").style.visibility = "visible"
                    }}>
                        <img src={require('../img/icon/heart.png')} alt="" />
                    </button>
                    <button onClick={()=> {
                        document.getElementById('ShowNav').style.display = "none"
                        document.getElementById("signin").style.visibility = "visible"
                    }}>
                        <img src={require('../img/icon/basket.png')} alt="" />
                    </button>
                </ul>
            </div>
        )
    }
    
    
    
    return (
        <>            
            <nav className="navHeader">
                
                <ul>
                    <li><Link to='/'><h1>STORE</h1></Link></li>
                    <li><div className="vr"></div></li>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/product'>Product</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>                    
                </ul>
                <ul>
                    <button onClick={()=> {
                        document.getElementById("signin").style.visibility = "visible"
                    }}>
                        <img src={require('../img/icon/heart.png')} alt="" />
                    </button>
                    <button onClick={()=> {
                        document.getElementById("signin").style.visibility = "visible"
                    }}>
                        <img src={require('../img/icon/basket.png')} alt="" />
                    </button>
                    <button onClick={()=> {
                            document.getElementById("signin").style.visibility = "visible"
                                             
                    }}>
                        <img src={require('../img/icon/user.png')} alt="" /> 
                    </button>                    
                </ul>
            </nav>
            {ShowNav()}
            {/* Mobile */}
            <nav className="navHeaderMobile">
                <ul>
                    <li><Link to='/'><h1>STORE</h1></Link></li>        
                </ul>
                <ul>
                    <button onClick={()=> {
                        document.getElementById("signin").style.visibility = "visible"
                    }}>
                        <img src={require('../img/icon/user.png')} alt="" /> 
                    </button>      
                    <button className="navHeaderMobileIcon" onClick={()=> {
                        document.getElementById('ShowNav').style.display = "flex"
                    }}>
                        <div className="navHeaderMobileOne"></div>
                        <div className="navHeaderMobileTwo"></div>
                        <div className="navHeaderMobileThree"></div>
                    </button>              
                </ul>
            </nav>
            <Outlet />
            {SignIn()}
            {SignUp()}
        </>
    )
}