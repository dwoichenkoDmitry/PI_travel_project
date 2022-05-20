
import classes from "./Search.module.css";
import InputPoint from "./InputPoint";





const Search = ({changeFunction, className}) => {

    return (
        <div className={className}>
            <div className={classes.inputCont}>
                <InputPoint className={classes.inputs + ' ' + classes.inputLeft} placeholder={'Откуда'}/>
                <InputPoint className={classes.inputs} placeholder={"Куда"}/>
                <input placeholder={"Когда"} className={classes.inputs + ' ' + classes.dateInput} type="date"/>
                <input placeholder={"Количество человек"} className={classes.inputs} type="text"/>
                <button onClick={changeFunction} className={classes.inputs + ' ' + classes.inputRight + ' ' + classes.searchBtn}>Найти билеты</button>
            </div>
        </div>
    );
};

export default Search;