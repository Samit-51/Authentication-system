import { useEffect, useState } from 'react';
import axios from 'axios';
import Hotel from '../Info/Hotel';

const Dashboard = () => {
  const [hotels, setHotels] = useState([]);  
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.post('http://localhost:3000/hotel/getHotels');
        setHotels(response.data); 
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);  
  return (
    <div className="wrapper">
      <div className="Container">
        <div className="Hotel">
          <h1>Hotels</h1>
          {hotels.length > 0 ? (
            hotels.map(hotel => (
              <Hotel Name={hotel.Name} Id={hotel.id}  Qr={hotel.qr}/>
            ))
          ) : (
            <p>No hotels found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
