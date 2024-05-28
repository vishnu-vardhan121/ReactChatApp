import React, { useContext, useState } from 'react'
import addimg from "../img/addimg.jpg"
import attach from "../img/attach.jpg"
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid} from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'


function Input() {

  const [text ,setText] =useState("")
  const [img ,setImg] =useState(null)
  const [preview, setPreview] = useState(null);
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const handleimage = (event) => {
    const file = event.target.files[0];
    setImg(file);

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
  
  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

const handleSend = async()=>{
  if(text !="" || img !=null){
    
   if(img){
    const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          console.error("Upload error:", error);
         
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db,"chats",data.chatId),{
              messages : arrayUnion(
                {id : uuid(),
                text,
                senderId :currentUser.uid,
                date : Timestamp.now(),
                  img:downloadURL,
              }
              )
            })
          });
        }
      );
    
   }else{
    await updateDoc(doc(db,"chats",data.chatId),{
      messages : arrayUnion(
        {id : uuid(),
        text,
        senderId :currentUser.uid,
        date :  Timestamp.now()}
      )
    })
   }
   
   await updateDoc(doc(db,"userChats", currentUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+ ".date"]: serverTimestamp()
   });
   await updateDoc(doc(db,"userChats", data.user.uid),{
    [data.chatId + ".lastMessage"]:{
      text
    },
    [data.chatId+ ".date"]: serverTimestamp()
 });

   setText("")
   setImg(null)
   setPreview(null)

  
  }
}

  return (
    <div className='msginput'>
      <input type="text" placeholder='Message' className='inputin' onKeyDown={handleKey} onChange={e=>setText(e.target.value)} value={text}/>
      <div className="send">
        <img src={attach} alt="" width={"24px"} />
        <input type="file"  style={{display:"none"}} id='file' onKeyDown={handleKey}  onChange={handleimage} />
        <label htmlFor="file">
          {preview?<img src={preview} className='previewimg'/>:<img src={addimg} alt="" width={"35px"} />}
        </label>
        <button className='sendbutton' onClick={handleSend} onKeyDown={handleKey}>&#x27A3;</button>
      </div>
    </div>
  )
}

export default Input