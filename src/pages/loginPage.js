import React, { useState } from "react";
import "./styles/registerStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function LoginPage() {
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const defaultUser = () => {
    setEmail("default@gmail.com");
    setPassword("default");
  };

  const validateForm = () => {
    if (!email || !password) {
      setErr("Email and password cannot be empty");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErr("Invalid email format");
      return false;
    }

    if (password.length < 6) {
      setErr("Password must be at least 6 characters long");
      return false;
    }

    setErr("");
    return true;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      navigate("/");
    } catch (err) {
      setErr("Failed to log in. Please check your credentials.");
      console.error("Sign-in error:", err);
    }
  };

  return (
    <div className="form-container">
      <form className="form-wrapper" onSubmit={submitHandler}>
        <span className="logo">
          <b>ChatiFy</b>
        </span>
        <span className="title">User Login</span>
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" type="submit">Login</button>
        {err && <span className="error-message">{err}</span>}
        <span className="default-user-button" onClick={defaultUser} >
          Use Default User
        </span>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
