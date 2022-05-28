import React from 'react';
import classes from "./TicketItem.module.css";
import Train from './img/subway.png';
import {findAllByDisplayValue} from "@testing-library/react";
import Logo from "./img/travel-guide (2).png";
import axios from "axios";

const TicketItem = ({ticket, savedTicket, login, autorized, fillTicketsUser}) => {
    /**
     * Функция сохранения билетов
     * @constructor
     */
    function SaveTicket(){
        const API_URL = 'http://localhost:8000';
        const url = `${API_URL}/api/savedTickets/`;
        let checkHaveTicket = false
        savedTicket.forEach(item => {
            if(item.start === ticket.start && ticket.finish === item.finish && ticket.dateStart === item.dateStart
                && item.timeStart === ticket.timeStart
                && item.timeFinish === ticket.timeFinish && item.price === ticket.price)
            {
                checkHaveTicket=true
                return
            }
        })
        if(checkHaveTicket===false){
            axios.post(url,{startPoint:ticket.start,
                finishPoint:ticket.finish,
                startTime:ticket.timeStart,
                finishTime:ticket.timeFinish,
                startDate:ticket.dateStart,
                finishDate: ticket.dateFinish,
                price:ticket.price,
                sourceLink: ticket.link,
                login: login})
                .then(response => {
                    console.log(response.data)
                });
            fillTicketsUser(login)
        }
        else {
            console.log("Уже добавлен")
        }

    }

    return (
        <div className="ticketPost" className={classes.ticketsPost + ' ' + classes.container}>
            <div>
                <p>{ticket.start}</p>
                <p>{ticket.dateStart}</p>
                <p>{ticket.timeStart}</p>
            </div>
            <div>
                <h1>&#8594;</h1>
                <h2>{ticket.price}</h2>
            </div>
            <div>
                <p>{ticket.finish}</p>

                <p>{ticket.dateFinish}</p>

                <p>{ticket.timeFinish}</p>
            </div>

                <div>
                    {autorized?
                    <p onClick={SaveTicket} className={classes.savedLink}>Сохранить</p>
                        :
                        ''
                    }
                    <a href={ticket.link}>Источник</a>
                </div>

        </div>

    );
};

export default TicketItem;