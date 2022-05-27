import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

const SignUp = ({closedSign2, haveUser, changeLogin, changeMail, fillTicketsUser}) => {
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    closest()
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {

                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function closest(){
        closedSign2(false)
    }

    function signUp(){
        let login = document.querySelector('.login').value
        let password = document.querySelector('.password').value
        const API_URL = 'http://localhost:8000';
        const url = `${API_URL}/api/user/${login}/${password}`;

        axios.get(url).then(response => {
            if(response.data.check === true){
                haveUser(true)
                changeLogin(login)
                changeMail(response.data.mail)
                fillTicketsUser(login)
            }
        })
        closedSign2(false)
    }


    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div>
            <div className="registerFon">
                <div ref={wrapperRef} className="registerWindow">
                    <input type="text" className="login" placeholder="login" name="login"/>
                    <input type="password" className="password" placeholder="password" name="password"/>
                    <button onClick={signUp}>Войти</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;