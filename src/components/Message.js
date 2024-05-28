

import React, { useContext, useEffect, useRef} from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

function Message({message}) {
  
  // console.log(message.date.toDate())
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  const messageDate = new Date(message.date.seconds * 1000);
  const messageTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const ref =useRef()

  useEffect(()=> {
    ref.current?.scrollIntroViwe({behavior : "smooth"})
  },[message])

  return (
    <>
      {message.img || message.text ? (
        <div className={message.senderId === currentUser.uid ? "owner" : "message"}>
          <div>
          <div className="messageinfo">
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
            <span className='time'>{messageTime}</span>
          </div>
          </div>
          <div className="messageContent">
            {message.text && <p>{message.text}</p>}
            {message.img && <img src={message.img} alt="" style={{width:"150px"}}/>}
          </div>
        </div>
      ) : null}
    </>
  );
  
}

export default Message