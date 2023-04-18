import Header from '../components/Header'
import Tab from '../components/Tab'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../fbase';

import '../styles/home.scss'
import { BsFillGearFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';

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

  const truncate = (str, n) =>{
    return str?.length > n ? str.substr(0, n-1) + "..." : str;
  }
  
  return (
    <>
    <Header left="Manage" title="Friends" span={friends.length} right={<BsFillGearFill />} /> 

    <main>
    <form className="search_box">
      <fieldset className="search_inner">
          <legend className="blind">검색창</legend>
          <FaSearch className='ico'/>
          <input type="search" name="search" id="search" placeholder="Find Friends, chats, Plus Friends" />
        </fieldset>
      </form>

      <section className="main_section">
        <header><h2>My Profile</h2></header>
        <ul>
          <li className='friend_list'>
            <Link className='my_profile friend_profile' to="/myprofile">
              <div className="profile_row empty" style = {userObj.photoURL === null ? {backgroundImage: ''}: {backgroundImage: `url(${userObj.photoURL})`} }>
                <div className="profile_name">{`${userObj.displayName || "Enter your name in Here"}`}</div>
                <div className="profile_messages">{truncate(newProfileMessage ? `${newProfileMessage}` : '', 15)}</div>
              </div>
            </Link>
          </li>
        </ul>
      </section>

      <section className="main_section">
        <header><h2>Friends</h2></header>
        <ul>
          {friends.map((friends, index) => 
            <li key={index} className='friend_list'>
            <Link className='friend_profile' to={'/profile'} state = {{friendId: friends.id, friendName: friends.name,friendEmail: friends.email, profileImg: friends.profileImg, profileBg: friends.profileBg}}>
              <div className="profile_row empty" style = {{backgroundImage : `url(${friends.profileImg})`}}>
                <div className="profile_name"><span>{friends.name}</span></div>
                <div className="profile_messages">{truncate(friends.catchPhrase, 20)}</div>
              </div>
            </Link>
          </li>
          )}
        </ul>
      </section>
    </main>

    <Tab />
    
    </>
  )
}


export default Home