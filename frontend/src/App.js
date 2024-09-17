import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import LoginForm from './Components/LoginForm';
import SigninForm from './Components/SigninForm';
import Dashboard from './Components/Dashboard';
import { Routes, Route}from 'react-router-dom';
import axios from 'axios';
const App =  () =>{
  
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.post('http://localhost:3000/check-token');
          if (response.data.success) {
            navigate('/dashboard'); 
          }else{
            navigate('/signin'); 
          }
        } catch (error) {
          navigate('/signin'); 
        }
    };
    checkToken();
  }, [navigate]);
  
  return(
      <Routes>
        <Route path="/" element={<SigninForm />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    );
}  


export default App;