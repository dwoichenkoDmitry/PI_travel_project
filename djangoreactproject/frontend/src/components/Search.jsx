
import classes from "./Search.module.css";
import InputPoint from "./InputPoint";





const Search = ({changeFunction, className}) => {

    return (
        <div className={classes.inputContainer + ' ' + className}>
            <div className={classes.inputCont}>
                <InputPoint className={classes.inputs + ' ' + classes.inputLeft + ' inpStartVal'} placeholder={'Откуда'}/>
                <InputPoint className={classes.inputs + ' inpFinishVal'} placeholder={"Куда"}/>
                <input placeholder={"Когда"} className={classes.inputs + ' ' + classes.dateInput + ' inpDateVal'} type="date"/>
                <input placeholder={"Количество человек"} className={classes.inputs} type="text"/>
                <button onClick={changeFunction} className={classes.inputs + ' ' + classes.inputRight + ' ' + classes.searchBtn}>Поиск</button>
            </div>
        </div>
    );
};

export default Search;