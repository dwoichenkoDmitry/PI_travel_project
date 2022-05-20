import React from 'react';
import classes from "./Navbar.module.css";
import Logo from './img/travel-guide (2).png';
import Profile from './img/man-avatar.png'



const Navbar = ({props, funk}) => {

    return (
        <div className={classes.header}>
            <a href="#"><img src={Logo} className={classes.logoImg} alt="logo"/></a>
            <p className={classes.textDecor}>FASTER CHEAPEST BETTER</p>

            <div className={classes.profileContainer}>
                <img className={classes.logoImg} src={Profile} alt=""/>
                {/*<p className={classes.profileText}>Профиль</p>*/}
            </div>
        </div>
    );
};

export default Navbar;