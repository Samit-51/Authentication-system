import '../Css/Dashboard.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Hotel from '../Info/Hotel';
const Dashboard = () => {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [minute, setMinute] = useState('');
  const [hour, setHour] = useState('');
  const [greeting, setGreeting] = useState('');
  const [Hotels, setHotels] = useState([]);
  const [show, setShow] = useState('');
  const [HotelName, setHotelName] = useState('');
  const [error, setError] = useState('');
  const handelSubmit = async(e)=>{
    e.preventDefault();
    const response = await axios.post(`http://${process.env.REACT_APP_HOST}:3000/info/addHotels`, {
      HotelName : HotelName
    });
    if(response.data.errors) {
      setError(response.data.errors.HotelName);
      return;
    }else{
      alert('Hotel added succesfully.')
    }
  }
  useEffect(() => {
    const Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const updateDateTime = () => {
      const now = new Date();
      const currentDay = Days[now.getDay()];
      const currentDate = now.getDate();
      const currentMonth = now.toLocaleString('default', { month: 'short' });
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      currentDate < 10 ? setDate('0' + currentDate) : setDate(currentDate);
      setMonth(currentMonth);
      setDay(currentDay);
      currentHour <= 9 ? setHour('0'+ currentHour) : setHour(currentHour)
      currentMinute <= 9 ? setMinute('0'+ currentMinute) : setMinute(currentMinute)

      if (currentHour >= 6 && currentHour < 12) {
        setGreeting('morning.');
      } else if (currentHour >= 12 && currentHour < 16) {
        setGreeting('afternoon.');
      } else if (currentHour >= 16 && currentHour < 18) {
        setGreeting('evening.');
      } else {
        setGreeting('night.');
      }
    };
    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);
    const getHotels = async () =>{
      const hotels = await axios.post(`http://${process.env.REACT_APP_HOST}:3000/info/getHotels`);
      setHotels(hotels.data.Hotels);
    }
    getHotels();
    return () => {
      clearInterval(interval)
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="greetings">
        <div className="greeting">
          <p style={{ fontFamily: "Cursive", color: "yellow", fontSize: "16px" }}>Hello</p>
          Good <br /> {greeting}
          <p className="motivation">HAVE A GREAT DAY</p>
          <p>{hour}:{minute}</p>
        </div>
        <div className="dates">
          <div className="date">
          <div className="day">{ date }</div>
          <div className="mth">{ month }</div>
        </div>
        <p style={{fontFamily:'Concert One', fontSize:'34px'}}>{day}</p>
      </div>
      </div>
      <div className="hotels">
        <div className="header">
          <h1>Hotels</h1>
          <button className="admin-btn" onClick={()=>{ setShow(!show)}
          }><i className="fa-solid fa-plus"></i> Add</button>
        </div>
        <form onSubmit={handelSubmit}>
        <input 
          type="text"
          placeholder="Hotel name"
          className="admin-input"
          style={show ? {display:"block"} : {display: "none"}}
          onChange={(e)=>{
            setHotelName(e.target.value);
          }}
          />
          {error && <p>{error}</p>}
          </form>
        <div className="hotel-cards">
            {
              Hotels.length > 0 ? (
                Hotels.map(hotel => (
                  <Hotel Name={hotel.HotelName} Id={hotel.HotelId} Qr="" />
                ))
              ) : (
              <p>No hotel found</p>
              )
            }
          </div>
      </div>
    </div>
  );
};

export default Dashboard;