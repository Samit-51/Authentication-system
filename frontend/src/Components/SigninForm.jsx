import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SigninForm = () => {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Usernameerror, setUsernameerror] = useState('');
  const [Emailerror, setEmailerror] = useState('');
  const [Passworderror, setPassworderror] = useState('');
  const navigate = useNavigate(); 
  const handleSubmit = async(e) => {
      e.preventDefault();
      setUsernameerror('');
      setEmailerror('');
      setPassworderror('');
      try{
      const response = await axios.post('http://localhost:3000/signin', {
        username: Username,
        email: Email,
        password: Password
      });
      if(response.data.errors){
        let errors = response.data.errors;
        setUsernameerror(errors.Username);
        setEmailerror(errors.Email);
        setPassworderror(errors.Password);
        return;
      }
      navigate('/dashboard');
      } catch (error) {
       console.error('Error creating user', error);
     }
    }
  return(
    <div className="wrapper">
      <div className="container">
        <h1>Create your account.</h1>
        <form onSubmit={handleSubmit}>
        <div className="input-container">
          <i className="fas fa-user"></i>
          <input
          type="text"
          placeholder="Username"
          onChange ={(e) =>{
            setUsername(e.target.value)
          }}
          />
        </div>
        {Usernameerror && <p className="error">{Usernameerror}</p>}
        <div className="input-container">
          <i className="fas fa-envelope"></i>
          <input
          type="email"
          placeholder="E-mail address"
          onChange ={(e) =>{
            setEmail(e.target.value)
          }}
          />
        </div>
        {Emailerror && <p className="error">{Emailerror}</p>}
        <div className="input-container">
          <i className="fas fa-lock"></i>
          <input
          type="password"
          placeholder="Password"
          onChange ={(e) =>{
            setPassword(e.target.value)
          }}
          />
        </div>
        {Passworderror && <p className="error">{Passworderror}</p>}
        <div className="save-info">
        <input 
        type= 'checkbox'
        />Remember me
        </div>
        <button>Sign-in</button>
        </form>
        <p className="link">Already have an account? <a href="http://localhost:3000/login">Login</a></p>
      </div>
    </div>
  )
}

export default SigninForm;