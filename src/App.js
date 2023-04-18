import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { authService } from './fbase';
import { onAuthStateChanged } from 'firebase/auth';

import Auth from './components/Auth';
import Home from './routes/Home'
import Chats from './routes/Chats';
import Find from './routes/Find';
import More from './routes/More';
import MyProfile from './routes/MyProfile';
import Chatting from './routes/Chatting';
import Profile from './routes/Profile';

import friends from './data/friend.json';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null)

  useEffect(() =>{
    onAuthStateChanged(authService, (user) =>{
      if(user) {
        setIsLoggedIn(user)
        setUserObj(user)

      } else {
        setIsLoggedIn(false)
      }
    });
 
  },[]);

  return (
    <>
    <BrowserRouter basename={process.env.PUBLIC_URL} >
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home friends={friends} userObj = {userObj}/>} />
          <Route path="/chats" element={<Chats friends={friends} />} />
          <Route path="/find" element={<Find />} />
          <Route path="/more" element={<More userObj = {userObj} />} />
          <Route path="/profile" element={<Profile friends={friends} userObj = {userObj}/>} />
          <Route path="/myprofile" element={<MyProfile userObj={userObj}/>} />
          <Route path="/chatting" element={<Chatting friends={friends} userObj={userObj}/>}  />
          
        </Routes>
      ) : (
        <Auth/>
      )}
    </BrowserRouter>

  </>

  )
}

export default App