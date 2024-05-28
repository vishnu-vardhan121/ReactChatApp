import React, { useState } from "react";
import "./styles/registerStyle.css";
import addimg from "../img/addimg.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import defaultProfilePic from "./styles/pp.jpg";

const RegisterPage = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleProfileSelect = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
   

    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);

      if (profilePic) {
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, profilePic);

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
      } else {
        // Use defaultProfilePic if no file is selected
        await updateProfile(resp.user, {
          displayName,
          photoURL: defaultProfilePic,
        });
        await setDoc(doc(db, "users", resp.user.uid), {
          uid: resp.user.uid,
          displayName,
          email,
          photoURL: defaultProfilePic,
        });

        await setDoc(doc(db, "userChats", resp.user.uid), {});
        navigate("/");
      }
    } catch (err) {
      console.error("Sign-up error:", err);
      setLoading(false);
      setErr(true);
    }
  };

  return (
    <div className="form-container">
      <form className="form-wrapper" onSubmit={submitHandler}>
        <span className="logo">
          <b>ChatiFy</b>
        </span>
        <span className="title">Register</span>
        <input type="text" placeholder="Display-name" className="input" />
        <input type="email" placeholder="Email" className="input" />
        <input type="password" placeholder="Password" className="input" minLength={6} />
        <input type="file" style={{ display: "none" }} id="file" onChange={handleProfileSelect} />
        <label htmlFor="file" className="label">
        {preview ? <img src={preview} alt="Profile preview" className="profile-preview" />:<img src={addimg} alt="Add profile" width={"20px"} /> }Add profile
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
  );
};

export default RegisterPage;
