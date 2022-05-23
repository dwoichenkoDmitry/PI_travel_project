import './App.css';
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import StartHeader from "./components/StartHeader";
import React, {useState} from "react";
import TicketList from "./components/TicketList";
import axios from 'axios';
import Profile from "./components/Profile";





function App() {

    const [tickets, setTickets] =  useState([
        {id: 1, start: 'TMN', finish: 'MSK', dateStart: '13.05', dateFinish: '14.05', price: '5700 руб.', timeStart: '12:00', timeFinish: '14:00'},
        {id: 2, start: 'TMN', finish: 'MSK', dateStart: '13.05', dateFinish: '14.05', price: '5700 руб.', timeStart: '12:00', timeFinish: '14:00'},
        {id: 3, start: 'TMN', finish: 'MSK', dateStart: '13.05', dateFinish: '14.05', price: '5700 руб.', timeStart: '12:00', timeFinish: '14:00'},
        {id: 3, start: 'TMN', finish: 'MSK', dateStart: '13.05', dateFinish: '14.05', price: '5700 руб.', timeStart: '12:00', timeFinish: '14:00'},
        {id: 3, start: 'TMN', finish: 'MSK', dateStart: '13.05', dateFinish: '14.05', price: '5700 руб.', timeStart: '12:00', timeFinish: '14:00'}
    ])
    const [checkBtn, changeCheck] = useState(false);
    const [styles, setStyles] = useState('mainSearch')
    const [checkProfile, changeProfile] = useState(true)
    function checkPressMane(){
        changeCheck(true)
        setStyles('mainSearchSecond')
    }

    function Yolo(){
        const API_URL = 'http://localhost:8000';
        const url = `${API_URL}/api/tickets/`;
        let startVal = document.querySelector('.inpStartVal').value
        let finishVal = document.querySelector('.inpFinishVal').value
        let dateVal = document.querySelector('.inpDateVal').value
        dateVal = dateVal.substr(8,2) + dateVal.substr(5,2)
        let mas = []
        axios.post(url,{start: startVal, finish: finishVal, date: dateVal})
            .then(response => {

                setTickets([])

                mas = []
                response.data.data.forEach((item, index) => {


                    mas.push({id: index, ...item, date: dateVal})

                })
                console.log(mas)
                setTickets(mas)
                console.log(tickets)
            });
        changeCheck(true)
        setStyles('mainSearchSecond')
    }



  return (
      <div className="mainFon">
        <div className={checkBtn? 'AppSecond':"App"} >
            <Profile/>
            <Navbar funk={changeProfile}/>
            {checkBtn? '' :<StartHeader/>}
            <Search changeFunction={Yolo} className={styles}/>
        </div>
          {checkBtn?<TicketList tickets={tickets}/>: ''}
      </div>
  );
}

export default App;
