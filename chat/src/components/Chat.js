import React, { useContext } from 'react'
import "./styles/chatbar.css"
import cam from "../img/cam.jpg"
import addcant from "../img/addCant.jpg"
import more from "../img/more.jpg"
import Messages from './Messages'
import Input from './input'
import { ChatContext } from '../context/ChatContext'


function Chat() {
  const { data } = useContext(ChatContext)
  return (
    <div className='chat'>
      <div className="chatInfo">
      <span style={{fontSize:"23px"}}>{data.user?.displayName}</span>
        <div className="chatIcons">
        <img src={cam} alt=""  width={"24px"} height={"24px"}/>
        <img src={addcant} alt=""  width={"24px"} height={"24px"}/>
        <img src={more} alt=""  width={"24px"} height={"24px"}/>

        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat