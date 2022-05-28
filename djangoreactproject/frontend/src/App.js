import './App.css';
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import StartHeader from "./components/StartHeader";
import React, {useState} from "react";
import TicketList from "./components/TicketList";
import axios from 'axios';
import Registration from "./components/Registration";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Preloader from "./components/Preloader";
import TypeChanger from "./components/TypeChanger";





function App() {

    const [tickets, setTickets] =  useState([])
    const [ticketsTrain, setTicketsTrain] =  useState([])
    const [checkBtn, changeCheck] = useState(false);
    const [styles, setStyles] = useState('mainSearch')
    const [openRegister, setOpenRegister] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)
    const [haveUser, setHaveUser] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const [savedTicket, setSavedTicket] = useState([])
    const [login, setLogin] = useState('')
    const [mail, setMail] = useState('')
    const [showPreloader, setPreloader] = useState(false)
    const [aviaTicketsCheck, setAviaTicketsCheck] = useState(true)

    function checkPressMane(){
        changeCheck(true)
        setStyles('mainSearchSecond')
    }


    /**
     * Функция добавления на страницу результатов поиска
     * @constructor
     */
    function Yolo(){
        const API_URL = 'http://localhost:8000';
        const url = `${API_URL}/api/tickets/`;
        let startVal = document.querySelector('.inpStartVal').value
        let finishVal = document.querySelector('.inpFinishVal').value
        let dateVal = document.querySelector('.inpDateVal').value
        if(startVal.length>0 && finishVal.length>0 && dateVal.length>0){
            dateVal = dateVal.substr(8,2) + dateVal.substr(5,2)
            console.log(dateVal)
            let mas = []
            let masTrain = []
            setPreloader(true)
            axios.post(url,{start: startVal, finish: finishVal, date: dateVal})
                .then(response => {

                    setTickets([])
                    setTicketsTrain([])
                    mas = []
                    masTrain = []
                    response.data.data.forEach((item, index) => {
                        mas.push({id: index, start: startVal, finish: finishVal,
                            dateStart: item.startDate, dateFinish: item.finishDate, price: item.price,
                            timeStart: item.startTime, timeFinish: item.finishTime, link: item.link})
                    })
                    response.data.data_train.forEach((item, index) => {
                        masTrain.push({id: index, start: startVal, finish: finishVal,
                            dateStart: item.startDate, dateFinish: item.finishDate, price: item.price,
                            timeStart: item.startTime, timeFinish: item.finishTime, link: item.link})
                    })

                    setTickets(mas)
                    setTicketsTrain(masTrain)
                    setPreloader(false)
                    changeCheck(true)
                });
            setStyles('mainSearchSecond')
        }
        else{
            alert("Заполните все поля")
        }
    }


    /**
     * Функция получения сохранённых билетов пользователя
     * @param login
     */
    function getSavedTicketsFromLogin(login){
        const API_URL = 'http://localhost:8000';
        const url = `${API_URL}/api/savedTicket/${login}/`;
        axios.get(url).then(response=>{
            setSavedTicket([])
            let mas = []
            response.data.items.forEach((item, index) => {
                mas.push({id: index, start: item.start, finish: item.finish, dateStart: item.dateStart, dateFinish: item.dateFinish,
                    price: item.price, timeStart: item.timeStart, timeFinish: item.timeFinish, link: item.link})
            })

            setSavedTicket(mas)
        })
    }

  return (
      <div className="mainFon">
          {showPreloader?
              <Preloader/>
              :
              ''
          }
          {openProfile?
              <Profile savedTickets={savedTicket} haveUser={setHaveUser} funcShowProfile={setOpenProfile} login={login} mail={mail}/>
              :
              ''

          }
        <div className={checkBtn? 'AppSecond':"App"} >
            <Navbar checkHaveUser={haveUser} funkShowReg={setOpenRegister} funkShowSign={setOpenSignUp}
                    funcShowProfile={setOpenProfile}/>
            {openRegister?
                <Registration setLogin={setLogin} setMail={setMail} funcClosed={setOpenRegister} haveUser={setHaveUser}/>
                :
                ''
            }
            {openSignUp?
                <SignUp closedSign2={setOpenSignUp} changeLogin={setLogin}
                        changeMail={setMail} haveUser={setHaveUser} fillTicketsUser={getSavedTicketsFromLogin}/>
                :
                ''
            }

            {checkBtn? '' :<StartHeader/>}
            <Search changeFunction={Yolo} className={styles}/>

        </div>
          {checkBtn? <TypeChanger setTicket={setAviaTicketsCheck}/>:''}
          {checkBtn && aviaTicketsCheck?
              <TicketList savedTicket={savedTicket} fillTicketsUser={getSavedTicketsFromLogin} autorized={haveUser} login={login} tickets={tickets}/>: ''}
          {checkBtn && !aviaTicketsCheck?
              <TicketList savedTicket={savedTicket} fillTicketsUser={getSavedTicketsFromLogin} autorized={haveUser} login={login} tickets={ticketsTrain}/>: ''}
      </div>
  );
}

export default App;
