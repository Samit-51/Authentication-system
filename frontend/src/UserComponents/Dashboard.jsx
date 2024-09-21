import '../Css/Dashboard.css';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [date, setDate] = useState('');
  const [mth, setMth] = useState('');
  useEffect(() => {
    setDate(new Date().getDate());
    setMth(new Date().toLocaleString('default', { month: 'short' }));
  }, []);

  return (
    <div className="dashboard">
      <div className="greetings">
        <div className="greeting">Good morning</div>
        <div className="dates">
          <div className="date">
            <div className="day">{ date }</div>
            <div className="mth">{ mth }</div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
