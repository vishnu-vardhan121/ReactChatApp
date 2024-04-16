import React, { useState } from "react";
import "./styles/registerStyle.css";
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function LoginPage() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate()


  const submiteHandler = async (event) => {
    event.preventDefault();
    const email = event.target[0].value.trim();
    const password = event.target[1].value.trim();

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch(err) {
      setErr(true);
      console.error('Sign-up error:', err);
    }
  };

  return (
    <>
      <div className="form-container">
        <form action="" className="form-wrapper" onSubmit={submiteHandler}>
          <span className="logo">
            <b>ChatiFy</b>
          </span>
          <span className="title"> User Login</span>
          <input type="email" placeholder="Email"  className="input"/>
          <input type="password" placeholder="Password" className="input" />
          <button className="button">Login</button>
          {err && <span>Somthing went wrong</span>}

          <p>Don't have an account ?<Link to="/register" >Sign in </Link> </p>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
