import React, {useState} from 'react';
import classes from "./TypeChanger.module.css";

const TypeChanger = ({setTicket}) => {
    const [avia, setAvia] = useState(classes.activeColor)
    const [train, setTrain] = useState(classes.deactiveColor)

    /**
     * Функции переключатели между билетами на поезд и самолёты
     * @constructor
     */
    function ClickAvia(){
        setAvia(classes.activeColor)
        setTrain(classes.deactiveColor)
        setTicket(true)
    }

    function ClickTrain(){
        setAvia(classes.deactiveColor)
        setTrain(classes.activeColor)
        setTicket(false)
    }

    return (
        <div className={classes.container}>
            <div onClick={ClickAvia} className={[classes.containerElements, avia].join(' ')}>
                <p>Самолёты</p>
            </div>

            <div onClick={ClickTrain} className={[classes.containerElements, train].join(' ')}>
                <p>Поезда</p>
            </div>
        </div>
    );
};

export default TypeChanger;