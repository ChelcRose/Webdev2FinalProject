import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "./usercontext";
import logo from "../assets/taskup-logo.png";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Login successful!");
        setUser({ isAuthenticated: true, token: result.token });

        if (result.isAdmin) {
          navigate("/dashboardAdmin");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("An error occurred while logging in. Please try again.");
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
            {...register("email", {
              required: "Email is required",
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            placeholder="Email"
            type="email"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
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