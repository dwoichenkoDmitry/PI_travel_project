import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";



const Registration = ({funcClosed, haveUser, setLogin, setMail}) => {
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    ji()
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {

                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function ji(){
        funcClosed(false)
    }

    async function register() {
        const API_URL = 'http://localhost:8000';
        const url = `${API_URL}/api/users/`;

        let login = document.querySelector('.login').value
        let mail = document.querySelector('.mail').value
        let password = document.querySelector('.password').value

        await axios.post(url, {login: login, mail: mail, password: password})
            .catch(err => console.log(login.value))
        funcClosed(false)
        haveUser(true)
        setLogin(login)
        setMail(mail)
    }



    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div className="registerFon">
            <div ref={wrapperRef} className="registerWindow">
                <input type="text" className="login" placeholder="login" name="login"/>
                <input type="email" className="mail" placeholder="e-mail" name="mail"/>
                <input type="password" className="password" placeholder="password" name="password"/>
                <button onClick={register}>Зарегистрироваться</button>
            </div>
        </div>
    );
};

export default Registration;