import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { authService } from './fbase';
import { onAuthStateChanged } from 'firebase/auth';

import Auth from './components/Auth';
import Home from './routes/Home'
import Chats from './routes/Chats';
import Find from './routes/Find';
import More from './routes/More';
import Profile from './routes/Profile';
import Chatting from './routes/Chatting';

import data from './data/friend.json';



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
          <Route path="/" element={<Home data={data} userObj = {userObj}/>} />
          <Route path="/chats" element={<Chats data={data} />} />
          <Route path="/find" element={<Find />} />
          <Route path="/more" element={<More userObj = {userObj} />} />
          <Route path="/profile" element={<Profile userObj={userObj} setUserObj={setUserObj}/>} />
          <Route path="/chatting" element={<Chatting userObj={userObj} />}  />
          
        </Routes>
      ) : (
        <Auth />
      )}
    </BrowserRouter>

  </>

  )
}

export default App