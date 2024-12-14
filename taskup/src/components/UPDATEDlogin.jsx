import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUser } from './usercontext';
import logo from '../assets/taskup-logo.png';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Login Data:', data);

    if (data.email === "admin@taskup.com" && data.password === "admin123") {
      setUser({ isAuthenticated: true, role: "admin" });
      navigate('/dashboardAdmin');
    } else if (data.email === "user@gmail.com" && data.password === "user123") {
      setUser({ isAuthenticated: true, role: "user" });
      navigate('/dashboard');
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <img src={logo} alt="TaskUp Logo" className="logo" />
      </div>

      <div className="right-panel">
        <h2>Login to your account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('email', { required: "Email is required", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
            placeholder="Email"
            type="email"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            {...register('password', { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            placeholder="Password"
            type="password"
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

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