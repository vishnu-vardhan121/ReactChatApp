import React, { useState } from "react";
import "./styles/registerStyle.css";
import addimg from "../img/addimg.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submiteHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress (if needed)
        },
        (error) => {
          console.error("Upload error:", error);
          setLoading(false);
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(resp.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", resp.user.uid), {
              uid: resp.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", resp.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      console.error("Sign-up error:", err);
      setLoading(false);
      setErr(true);
    }
  };

  return (
    <>
      <div className="form-container">
        <form action="" className="form-wrapper" onSubmit={submiteHandler}>
          <span className="logo">
            <b>ChatiFy</b>
          </span>
          <span className="title">Register</span>
          <input type="text" placeholder="Display-name" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <input type="file" style={{ display: "none" }} id="file" />
          <label htmlFor="file" className="label">
            <img src={addimg} alt="" width={"20px"} /> Add profile
          </label>
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
          {err && <span>Something went wrong</span>}
          <p>
            Already have an account? <Link to="/login">Login now</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
