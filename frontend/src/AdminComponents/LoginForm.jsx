import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Secret, setSecret] = useState('');
  const [Emailerror, setEmailerror] = useState('');
  const [SecretError, setSecretError] = useState('');
  const [Passworderror, setPassworderror] = useState('');
  const navigate = useNavigate(); 
  const handleSubmit = async(e) => {
      e.preventDefault();
      setEmailerror('');
      setPassworderror('');
      setSecretError('');
      try{
        const response = await axios.post(`http://${process.env.REACT_APP_HOST}:3000/admin/login`, {
        email: Email,
        password: Password,
        secret: Secret
      });
      if(response.data.errors){
        let errors = response.data.errors;
        setEmailerror(errors.Email);
        setPassworderror(errors.Password);
        setSecretError(errors.Secret);
        return;
      }
      navigate('/admin/dashboard');
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
          <i className="fas fa-key"></i>
          <input
          type="password"
          placeholder="Secret key"
          required 
          onChange ={(e) =>{
            setSecret(e.target.value)
          }}
          />
        </div>
        { SecretError && <p className="error">{SecretError}</p>}
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
        <p className="link">Don't have a account? <a href={`http://${process.env.REACT_APP_HOST}:3000/admin/signin`}>Create one!</a></p>
      </div>
    </div>
  )
}

export default LoginForm;