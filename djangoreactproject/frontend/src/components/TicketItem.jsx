import React from 'react';
import classes from "./TicketItem.module.css";
import Train from './img/subway.png';
import {findAllByDisplayValue} from "@testing-library/react";
import Logo from "./img/travel-guide (2).png";

const TicketItem = (props) => {
    return (
        <div className="ticketPost" className={classes.ticketsPost}>
            <div className={classes.leftItem}>
                <p className={classes.timeTime}>{props.ticket.timeStart}</p>
                <p className={classes.fromCity + ' ' + classes.dateTime}>{props.ticket.dateStart + ' ' + props.ticket.start}</p>
            </div>

            <div className={classes.rightItem}>
                <p className={classes.timeTime}>{props.ticket.timeFinish}</p>
                <p className={classes.dateTime + ' ' + classes.toCity}>{props.ticket.dateFinish  + ' ' + props.ticket.finish}</p>
            </div>

            <div>
            <p className={classes.price}>{props.ticket.price}</p>
            </div>
        </div>

    );
};

export default TicketItem;