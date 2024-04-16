import React, { useContext } from 'react'
import "./styles/sidebar.css"
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const {currentUser}=useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className='navlogo'>ChatiFy</span>
      <div  className='user'>
        <img src={currentUser.photoURL} alt=""  className='profile-image'/>
        <span style={{fontSize:"26px",color:"white"}}>{currentUser.displayName}</span>
        <button className='logout-button' onClick={()=>signOut(auth)}>logOut</button>
      </div>
    </div>
  )
}

export default Navbar