import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import LoginForm from './UserComponents/LoginForm';
import SigninForm from './UserComponents/SigninForm';
import Dashboard from './UserComponents/Dashboard';
import ALoginForm from './AdminComponents/LoginForm';
import ASigninForm from './AdminComponents/SigninForm';
import ADashboard from './AdminComponents/Dashboard';
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
            navigate('/login'); 
          }
        } catch (error) {
          navigate('/signin'); 
        }
    };
    if (!window.location.pathname.startsWith('/admin')) {
      checkToken();
    }
  }, [navigate]);
  
  return(
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/signin" element={<ASigninForm />} />
        <Route path="/admin/login" element={<ALoginForm />} />
        <Route path="/admin/dashboard" element={<ADashboard />} />
      </Routes>
    );
}  

export default App;