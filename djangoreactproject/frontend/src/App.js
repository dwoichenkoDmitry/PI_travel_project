import './App.css';
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import StartHeader from "./components/StartHeader";
import React, {useState} from "react";
import TicketList from "./components/TicketList";





function App() {

    const [tickets, setTickets] =  useState([
        {id: 1, start: 'Тюмень', finish: 'Москва', date: '13.05.2022', price: '5700 руб.'},
        {id: 2, start: 'Тюмень', finish: 'Москва', date: '14.05.2022', price: '5700 руб.'},
        {id: 3, start: 'Тюмень', finish: 'Москва', date: '15.05.2022', price: '5700 руб.'},
        {id: 3, start: 'Тюмень', finish: 'Москва', date: '15.05.2022', price: '5700 руб.'},
        {id: 3, start: 'Тюм', finish: 'Мо', date: '15.05.2022', price: '5700 руб.'}
    ])
    const [checkBtn, changeCheck] = useState(false);
    const [styles, setStyles] = useState('mainSearch')
    function checkPressMane(){
        changeCheck(true)
        setStyles('mainSearchSecond')
    }




  return (
      <div className="mainFon">
        <div className={"App"} >
            <Navbar/>
            {checkBtn? '' :<StartHeader/>}
            <Search changeFunction={checkPressMane} className={styles}/>
        </div>
          {checkBtn?<TicketList tickets={tickets}/>: ''}
      </div>
  );
}

export default App;
