import React from 'react';
import classes from "./StartHeader.module.css";

const StartHeader = () => {
    return (
        <div>
            <h1 className={classes.textDecor + ' ' + classes.mainText}>Сервис поиска билетов</h1>
            <p className={classes.textDecor + ' ' + classes.lastText}>Лучший способ найти дешевые билеты</p>
        </div>
    );
};

export default StartHeader;