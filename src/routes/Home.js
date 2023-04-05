import Header from '../components/Header'
import Tab from '../components/Tab'


import { BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import '../styles/home.scss'

function Home({data}, userObj) {
    
  return (
    <body>
     <Header left="Manage" title="friends" span="1" right={<BsFillGearFill />} /> 
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
            <Link to="/profile">
              <span className="profile_img empty"  style = {{backgroundImage : userObj.photoURL ? `url(${userObj.photoURL})` : '' }}></span>
              <span className="profile_name">{userObj.displayName}</span>
           </Link>
          </li>
        </ul>
      </section>

      <section className="main_section">
        <header><h2>Friends</h2></header>
        <ul>
          {data.map((friend, index) => 
            <li key={index}>
            <Link to={'/profile'} state = {{name : friend.name, email : friend.email, profileImg : friend.profileImg, profileBg : friend.profileBg}}>
              <span className="profile_img empty" style = {{backgroundImage : `url(${friend.profileImg})`}}></span>
              <span className="profile_name">{friend.name}</span>
              <span className="profile_messages">{friend.catchPhrase}</span>
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