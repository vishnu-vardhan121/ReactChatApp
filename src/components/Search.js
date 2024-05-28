import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [sdiv, setdiv] = useState(false);

  const handlebackspace =(event)=>{
    setUsername(event.target.value);
    if (username.length === 0 ) {
      setdiv(false);
    } else {
      setdiv(true);
    }
  }
  const handleSearch = async (event) => {
    setUsername(event.target.value);
    if (username.length === 0 || username.length === 1) {
      setdiv(false);
    } else {
      setdiv(true);
    }
    console.log("Searching for user:", username);
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", username),
      where("displayName", "<=", username + "\uf8ff")
    );
    console.log(q);
    try {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const userData = [];
        snapshot.forEach((doc) => {
          userData.push({ id: doc.id, ...doc.data() });
        });
        setUsers(userData);
      });
      return unsubscribe;
    } catch (err) {
      setErr(true);
    }
  };

  const handleSelect = async (user) => {
    // check whether the group(chats in firestore) exists, if not create

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUsername("");
    setUsers([]);
    // create user chats
  };
  return (
    <div className="search">
      <div className="SearchForm">
        <input
          type="text"
          className="SearchFormInput"
          placeholder="Search User.."
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              handlebackspace(e);
            }
          }}
          onChange={handleSearch}
          value={username}
        />
      </div>
      {err && <span>User not found</span>}

      {sdiv && (
        <div className="ucm">
          {" "}
          {users.map((user) => (
            <div
              className="suserChat"
              key={user.id}
              onClick={() => handleSelect(user)}
            >
              <img src={user.photoURL} alt="" className="suserChatImg" />
              <div className="suserChatInfo">
                <span>{user.displayName}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
