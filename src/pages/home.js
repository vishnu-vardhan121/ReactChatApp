import React, { useContext } from "react";
import "./styles/home-style.css"
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { DispWidthContext } from "../context/dispWidthContex";
import { PageContext } from "../context/pageContext";


function HomePage() {
  const {displayWidth}=useContext(DispWidthContext)
  const {pageState} = useContext(PageContext)
  return (
    <div className="home">
      <div className="container">
        {
          displayWidth <769 ? 
          pageState ?<Sidebar/> :<Chat/>
          :<>
          <Sidebar/>
          <Chat/>
          </>
        }
      </div>
    </div>
  );
}

export default HomePage;
