import React, {useEffect, useRef,useState} from 'react';
import classes from "./Navbar.module.css";
import Logo from './img/travel-guide (2).png';
import Profile from './img/man-avatar.png'




const Navbar = ({props, funk, funkShowReg,funkShowSign,checkHaveUser, funcShowProfile}) => {

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {

                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {

                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function openProfile(){
        funcShowProfile(true)
    }

    function ShowReg() {
        funkShowReg(true)
    }

    function ShowSignUp() {
        funkShowSign(true)
    }



    return (
        <div  className={classes.header}>
            <a href="#"><img src={Logo} className={classes.logoImg} alt="logo"/></a>
            <p className={classes.textDecor}>FASTER CHEAPEST BETTER</p>
            {checkHaveUser?
            <div onClick={openProfile} className={classes.profileContainer}>
                <img className={classes.logoImg} src={Profile} alt=""/>
                {/*<p className={classes.profileText}>Профиль</p>*/}
            </div> :
            <div className={classes.signUpBtns}>
                <p onClick={ShowReg} className="regBtn">Зарегистрироваться</p>
                <p onClick={ShowSignUp}>Войти</p>
            </div>
            }
        </div>
    );
};

export default Navbar;