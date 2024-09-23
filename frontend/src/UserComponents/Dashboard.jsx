import '../Css/Dashboard.css';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [minute, setMinute] = useState('');
  const [hour, setHour] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const updateDateTime = () => {
      const now = new Date();
      const currentDay = Days[now.getDay()];
      const currentDate = now.getDate();
      const currentMonth = now.toLocaleString('default', { month: 'short' });
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      setDate(currentDate);
      setMonth(currentMonth);
      setDay(currentDay);
      setHour(currentHour);
      setMinute(currentMinute);

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

    return () => clearInterval(interval);
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
    </div>
  );
};

export default Dashboard;
