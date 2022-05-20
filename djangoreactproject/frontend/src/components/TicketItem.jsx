import React from 'react';

const TicketItem = (props) => {
    return (
        <div className="ticketPost">
            <p>{props.ticket.start}</p>
            <p>{props.ticket.finish}</p>
            <p>{props.ticket.date}</p>
            <p>{props.ticket.price}</p>
        </div>
    );
};

export default TicketItem;