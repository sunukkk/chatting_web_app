import React from 'react'
import Header from '../components/Header'
import Tab from '../components/Tab'
import '../styles/more.scss'
import { BsFillGearFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../fbase';

function More({userObj}) {
  const navigate = useNavigate();

  const onLogOutClick = () =>{
    authService.signOut();
    navigate('/')
  }

  return (
    <body>
    <Header title="More" right={<BsFillGearFill />} />
        <main>
      
          <section className="user_info">
          
            <h2 className="blind">사용자 정보</h2>
            <span className="more_profile_img empty" style = {userObj.photoURL === null ? {backgroundImage: ''}: {backgroundImage: `url(${userObj.photoURL})`} }></span>
            
            <span className="profile_info">
              <span className="profile_name">{userObj.displayName}</span>
              <span className="profile_email">{userObj.email}</span>
            </span>
            <span className='logout' onClick={onLogOutClick}><Link to='/'><i class="fa-solid fa-arrow-right-from-bracket"></i></Link></span>
            <span className="chat_img"><Link><i className="fa-regular fa-comment"></i></Link></span>
            </section>
        
          <section className="user_menu">
            <h2 className="blind">사용자 메뉴</h2>
              <ul>
                <li><Link><i className="fa-solid fa-face-smile"></i>Emoticons</Link></li>
                <li><Link><i className="fa-solid fa-paintbrush"></i>Themes</Link></li>
                <li><Link><i className="fa-regular fa-hand-peace"></i>Plus Friend</Link></li>
                <li><Link><i className="fa-solid fa-circle-user"></i>Account</Link></li>
              </ul>
          </section>  

          <section className="plus_friends">
            <header>
              <h2>Plus Friends</h2>
              <span><i className="fa-solid fa-circle-info"></i>Learn More</span>
            </header>
            <ul className="plus_list">
              <li><Link><i className="fa-solid fa-utensils"></i>Order</Link></li>
              <li><Link><i className="fa-solid fa-house-chimney"></i>Store</Link></li>
              <li><Link><i className="fa-solid fa-tv"></i>TV Channel/Radio</Link></li>
              <li><Link><i className="fa-solid fa-pencil"></i>Creation</Link></li>
              <li><Link><i className="fa-solid fa-graduation-cap"></i>Education</Link></li>
              <li><Link><i className="fa-solid fa-building-columns"></i>Politics/Society</Link></li>
              <li><Link><i className="fa-solid fa-won-sign"></i>Finance</Link></li>
              <li><Link><i className="fa-solid fa-video"></i>Movies/Music</Link></li>
            </ul>
          </section>
        </main>

      <Tab />

    </body>
  )
}

export default More