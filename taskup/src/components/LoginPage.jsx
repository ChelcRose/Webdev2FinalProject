import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/taskup-logo.png';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Login Data:', data);
    navigate('/dashboard'); 
  };

  return (
    <div className="container">
      <div className="left-panel">
        <img src={logo} alt="TaskUp Logo" className="logo" />
      </div>
      <div className="right-panel">
        <h2>Login to your account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('email')} placeholder="Email" type="email" required />
          <input {...register('password')} placeholder="Password" type="password" required />
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don’t have an account yet? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
