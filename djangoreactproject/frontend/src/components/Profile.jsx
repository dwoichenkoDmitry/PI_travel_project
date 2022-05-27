import React, {useEffect, useRef,useState} from 'react';
import classes from "./Profile.module.css";
import TicketItem from "./TicketItem";
import ProfileTicket from "./ProfileTicket";

const Profile = ({savedTickets,funcShowProfile, login, mail}) => {

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



    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div ref={wrapperRef} className="ProfilePage" className={classes.text}>
            <h1 className={classes.moveBlock}>О Вас:</h1>
            <div className={classes.aboutBlock}>
                <p>Ваш логин: {login}</p>
                <p>Ваша почта: {mail}</p>
            </div>

            <h1 className={classes.moveBlock}>Избранные маршруты:</h1>
            <div>
                {savedTickets.map((ticket, index) =>
                    <ProfileTicket ticket={ticket} key={index}/>
                )}

            </div>
            
        </div>
    );
};

export default Profile;