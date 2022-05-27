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





function App() {

    const [tickets, setTickets] =  useState([])
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
        console.log(dateVal)
        let mas = []
        axios.post(url,{start: startVal, finish: finishVal, date: dateVal})
            .then(response => {

                setTickets([])

                mas = []
                response.data.data.forEach((item, index) => {
                    mas.push({id: index, start: startVal, finish: finishVal,
                        dateStart: item.startDate, dateFinish: item.finishDate, price: item.price,
                        timeStart: item.startTime, timeFinish: item.finishTime, link: item.link})
                })
                console.log(mas)
                setTickets(mas)

            });
        setPreloader(true)
        console.log(showPreloader)
        setTimeout(()=>{
            setPreloader(false)
                changeCheck(true)
        }
        ,30000)

        setStyles('mainSearchSecond')
    }




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
              <Profile savedTickets={savedTicket} funcShowProfile={setOpenProfile} login={login} mail={mail}/>
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
          {checkBtn?<TicketList fillTicketsUser={getSavedTicketsFromLogin} autorized={haveUser} login={login} tickets={tickets}/>: ''}
      </div>
  );
}

export default App;
