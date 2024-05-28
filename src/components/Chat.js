import React, { useContext } from 'react'
import "./styles/chatbar.css"
import cam from "../img/cam.jpg"
import addcant from "../img/addCant.jpg"
import more from "../img/more.jpg"
import Messages from './Messages'
import Input from './input'
import { ChatContext } from '../context/ChatContext'
import { DispWidthContext } from '../context/dispWidthContex'
import { PageContext } from '../context/pageContext'


function Chat() {
  const { data } = useContext(ChatContext)
  const {displayWidth}=useContext(DispWidthContext)
  const {pageState ,handlePageChange} =useContext(PageContext)
  return (
    <div className='chat'>
      <div className="chatInfo">
        <div style={{display:'flex'}}>
          {displayWidth < 499 && <span className='arrow' onClick={handlePageChange}>&#8617;</span>}
        
        <img src={data.user?.photoURL} alt="" style={{width :"30px", height:"30px",objectFit: "cover",borderRadius:"50%"}}/>
        <span style={{fontSize:"23px",paddingLeft:"10px"}}>{data.user?.displayName}</span>
        </div>
         <div className="chatIcons">
        <img src={cam} alt=""  width={"24px"} height={"24px"} style={{borderRadius:"50%"}}/>
        <img src={more} alt=""  width={"24px"} height={"24px"}/>

        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat