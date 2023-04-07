import Header from '../components/Header'
import Tab from '../components/Tab'


import { BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import '../styles/home.scss'

function Home({friends, userObj}) {

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
            <Link to="/myprofile">
              <span className="profile_img empty" style = {userObj.photoURL ? {backgroundImage: `url(${userObj.photoURL})`} : {backgroundImage: ''}}></span>
              <span className="profile_name">{`${userObj.displayName || "Enter your name in Here"}`}</span>
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