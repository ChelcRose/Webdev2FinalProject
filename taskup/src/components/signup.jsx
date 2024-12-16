import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../assets/taskup-logo.png";

const SignUpPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Sign Up Error:", err);
      alert("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <img src={logo} alt="TaskUp Logo" className="logo" />
      </div>
      <div className="right-panel">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            type="text"
            aria-label="Name"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format"
              }
            })}
            placeholder="Email"
            type="email"
            aria-label="Email"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            placeholder="Password"
            type="password"
            aria-label="Password"
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

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