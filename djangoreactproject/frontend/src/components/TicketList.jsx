import React from 'react';
import TicketItem from "./TicketItem";

const TicketList = ({tickets, login, autorized, fillTicketsUser}) => {
    return (
        <div>
            {tickets.map((ticket, index) =>
                <TicketItem ticket={ticket} autorized={autorized} fillTicketsUser={fillTicketsUser} login={login}/>
            )}
        </div>
    );
};

export default TicketList;