import React from 'react';
import TicketItem from "./TicketItem";

const TicketList = ({tickets, savedTicket, login, autorized, fillTicketsUser}) => {
    return (
        <div className="TicketList">
            {tickets.map((ticket, index) =>
                <TicketItem savedTicket={savedTicket} ticket={ticket} autorized={autorized} fillTicketsUser={fillTicketsUser} login={login}/>
            )}
        </div>
    );
};

export default TicketList;