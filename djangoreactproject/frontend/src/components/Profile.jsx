import React, {useEffect, useRef,useState} from 'react';
import classes from "./Profile.module.css";
import TicketItem from "./TicketItem";
import ProfileTicket from "./ProfileTicket";

const Profile = ({savedTickets, haveUser, funcShowProfile, login, mail}) => {
    /**
     * функция закрытия профиля по клику вне формы
     * @param ref
     */
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    funcShowProfile(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {

                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }


    function exitUser() {
        haveUser(false)
        funcShowProfile(false)
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div ref={wrapperRef} className="ProfilePage" className={classes.text}>
            <div className={classes.headerText}>
                <h1 className={classes.moveBlock}>О Вас:</h1>
                <h4 onClick={exitUser} className={classes.exitText}>Выход</h4>
            </div>

            <div className={classes.aboutBlock}>
                <p>Ваш логин: {login}</p>
                <p>Ваша почта: {mail}</p>
            </div>

            <h1 className={classes.moveBlock}>Избранные маршруты:</h1>
            <div>
                <h2 className={classes.typeText}>Самолёты</h2>
                {savedTickets.filter(item => item.dateStart.length !== 10).map((ticket, index) =>
                    <ProfileTicket ticket={ticket} key={index}/>
                )}
                <h2 className={classes.typeText}>Поезда</h2>
                {savedTickets.filter(item => item.dateStart.length === 10).map((ticket, index) =>
                    <ProfileTicket ticket={ticket} key={index}/>
                )}

            </div>
            
        </div>
    );
};

export default Profile;