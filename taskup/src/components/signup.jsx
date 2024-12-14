import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/taskup-logo.png';

const SignUpPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Sign Up Data:', data);
    navigate('/');
  };

  return (
    <div className="container">
      <div className="left-panel">
        <img src={logo} alt="TaskUp Logo" className="logo" />
      </div>
      <div className="right-panel">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('name')} placeholder="Name" type="text" required />
          <input {...register('email')} placeholder="Email" type="email" required />
          <input {...register('password')} placeholder="Password" type="password" required />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;