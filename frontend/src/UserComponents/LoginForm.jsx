import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Emailerror, setEmailerror] = useState('');
  const [Passworderror, setPassworderror] = useState('');
  const navigate = useNavigate(); 
  const handleSubmit = async(e) => {
      e.preventDefault();
      setEmailerror('');
      setPassworderror('');
      try{
        const response = await axios.post('http://localhost:3000/login', {
        email: Email,
        password: Password
      });
      if(response.data.errors){
        let errors = response.data.errors;
        setEmailerror(errors.Email);
        setPassworderror(errors.Password);
        return;
      }
      navigate('/dashboard');
      } catch (error) {
       console.error('Error loging-in user', error);
     }
    }
  return(    
  <div className="wrapper">
      <div className="container">
        <h1>Welcome back!</h1>
        <form onSubmit={handleSubmit}>
        <div className="input-container">
          <i className="fas fa-envelope"></i>
          <input
          type="email"
          placeholder="E-mail address"
          required 
          onChange ={(e) =>{
            setEmail(e.target.value)
          }}
          />
        </div>
        { Emailerror && <p className="error">{Emailerror}</p>}
        <div className="input-container">
          <i className="fas fa-lock"></i>
          <input
          type="password"
          placeholder="Password"
          required 
          onChange ={(e) =>{
            setPassword(e.target.value)
          }}
          />
        </div>
        {Passworderror && <p className="error">{Passworderror}</p>}
        <button>Log-in</button>
        </form>
        <p className="link">Don't have a account? <a href="http://localhost:3000/signin">Create one!</a></p>
      </div>
    </div>
  )
}

export default LoginForm;