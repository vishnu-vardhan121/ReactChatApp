import React from "react";
import "./styles/home-style.css"
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";


function HomePage() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  );
}

export default HomePage;
