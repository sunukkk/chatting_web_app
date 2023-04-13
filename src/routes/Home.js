import Header from '../components/Header'
import Tab from '../components/Tab'
import { useEffect, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import '../styles/home.scss'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../fbase';

function Home({friends, userObj}) {
console.log('friends->', friends )
  const [newProfileMessage, setNewProfileMessage] = useState("")
  useEffect(() => {

    const msgRef = doc(db, `${userObj.uid}/ProfileMessage`);
    const msgUnsubscribe = onSnapshot(msgRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setNewProfileMessage(data.message);
      }
    });

    return () => {
      msgUnsubscribe();
    };
  }, [userObj.uid]);
  
  return (
    <body>
     <Header left="Manage" title="Friends" span={friends.length} right={<BsFillGearFill />} /> 
    <main>
      <form className="search_box">
        <fieldset className="search_inner">
          <legend className="blind">검색창</legend>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="search" name="search" id="search" placeholder="Find Friends, chats, Plus Friends" />
        </fieldset>
      </form>

      <section className="main_section">
        <header><h2>My Profile</h2></header>
        <ul>
          <li>
            <Link to="/myprofile">
              <span className="profile_img empty" style = {userObj.photoURL ? {backgroundImage: `url(${userObj.photoURL})`} : {backgroundImage: ''}}></span>
              <span className="profile_name">{`${userObj.displayName || "Enter your name in Here"}`}</span>
              <span className="profile_messages">{newProfileMessage ? `${newProfileMessage}` : ''}</span>
           </Link>
          </li>
        </ul>
      </section>

      <section className="main_section">
        <header><h2>Friends</h2></header>
        <ul>
          {friends.map((friends, index) => 
            <li key={index}>
            <Link to={'/profile'} state = {{name : friends.name, email : friends.email, profileImg : friends.profileImg, profileBg : friends.profileBg}}>
              <span className="profile_img empty" style = {{backgroundImage : `url(${friends.profileImg})`}}></span>
              <span className="profile_name">{friends.name}</span>
              <span className="profile_messages">{friends.catchPhrase}</span>
            </Link>
          </li>
          )}
            
        </ul>
      </section>
    </main>
    <Tab />
    
    </body>
  )
  
}


export default Home