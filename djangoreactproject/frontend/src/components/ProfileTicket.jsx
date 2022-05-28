import React from 'react';
import classes from "./ProfileTicket.module.css";
const ProfileTicket = (props) => {
    return (
        <div className={classes.container}>
            <div>
                <p>{props.ticket.start} </p>
                <p>{props.ticket.dateStart}</p>
                <p>{props.ticket.timeStart}</p>
            </div>
            <div>
                <h1>&#8594;</h1>
                <h2>{props.ticket.price}</h2>
            </div>
            <div>
                <p>{props.ticket.finish}</p>

                <p>{props.ticket.dateFinish}</p>

                <p>{props.ticket.timeFinish}</p>
            </div>
            <div>
                <a className={classes.aHref} href={props.ticket.link}>Источник</a>
            </div>
        </div>
    );
};

export default ProfileTicket;