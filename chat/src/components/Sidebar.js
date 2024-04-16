import React from 'react'
import "./styles/containerStyle.css"
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'


function Sidebar() {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar