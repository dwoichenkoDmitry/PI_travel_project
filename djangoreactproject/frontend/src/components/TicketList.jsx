import React from 'react';
import TicketItem from "./TicketItem";

const TicketList = (props) => {
    return (
        <div>
            {props.tickets.map((ticket, index) =>
                <TicketItem ticket={ticket} key={ticket.id}/>
            )}
        </div>
    );
};

export default TicketList;