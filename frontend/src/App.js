import { useEffect , useState} from 'react';
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
  const[user, setUser] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const checkRouteToken = async () => {
      const res = await checkToken();

      if (!window.location.pathname.startsWith('/sign') && !window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/admin')) {
        if (res.token && res.success) {
          setUser(res.user.Username);
          navigate('/dashboard')
        } else {
          navigate('/login');
        }
      } else if (window.location.pathname.startsWith('/sign') || window.location.pathname.startsWith('/login')) {
        if (res.token && res.success) {
          navigate('/dashboard');
        } else {
          navigate(window.location.pathname);
        }
      }
    };
    checkRouteToken();
  }, [navigate]);

  const checkToken = async () => {
    if(!window.location.pathname.startsWith('/admin')){
    const response = await axios.post(`http://${process.env.REACT_APP_HOST}:3000/check-token`, {}, { withCredentials: true });
    return response.data;
    }
  };
  return(
      <Routes>
        <Route path="/" element={<Dashboard User={ user }/>} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard User={ user }/>} />
        <Route path="/admin/signin" element={<ASigninForm />} />
        <Route path="/admin/login" element={<ALoginForm />} />
        <Route path="/admin/dashboard" element={<ADashboard />} />
      </Routes>
    );
}  

export default App;