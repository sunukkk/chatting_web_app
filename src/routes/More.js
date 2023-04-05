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
            <span className="more_ profile_img empty"></span>
            <span className="profile_info">
              <span className="profile_name">{userObj.displayName}</span>
              <span className="profile_email">{userObj.email}</span>
            </span>
            <span className='logout' onClick={onLogOutClick}><Link to='/'><i class="fa-solid fa-arrow-right-from-bracket"></i></Link></span>
            <span className="chat_img"><a href="#"><i className="fa-regular fa-comment"></i></a></span>
            </section>
        
          <section className="user_menu">
            <h2 className="blind">사용자 메뉴</h2>
              <ul>
                <li><a href="#"><i className="fa-solid fa-face-smile"></i>Emoticons</a></li>
                <li><a href="#"><i className="fa-solid fa-paintbrush"></i>Themes</a></li>
                <li><a href="#"><i className="fa-regular fa-hand-peace"></i>Plus Friend</a></li>
                <li><a href="#"><i className="fa-solid fa-circle-user"></i>Account</a></li>
              </ul>
          </section>  

          <section className="plus_friends">
            <header>
              <h2>Plus Friends</h2>
              <span><i className="fa-solid fa-circle-info"></i>Learn More</span>
            </header>
            <ul className="plus_list">
              <li><a href="#"><i className="fa-solid fa-utensils"></i>Order</a></li>
              <li><a href="#"><i className="fa-solid fa-house-chimney"></i>Store</a></li>
              <li><a href="#"><i className="fa-solid fa-tv"></i>TV Channel/Radio</a></li>
              <li><a href="#"><i className="fa-solid fa-pencil"></i>Creation</a></li>
              <li><a href="#"><i className="fa-solid fa-graduation-cap"></i>Education</a></li>
              <li><a href="#"><i className="fa-solid fa-building-columns"></i>Politics/Society</a></li>
              <li><a href="#"><i className="fa-solid fa-won-sign"></i>Finance</a></li>
              <li><a href="#"><i className="fa-solid fa-video"></i>Movies/Music</a></li>
            </ul>
          </section>

          <section className="more_app">
            <h2 className="blind">앱 더보기</h2>
            <ul>
            <li><a href="#"><span className="app_icon"></span>Kakao Story</a></li>
            <li><a href="#"><span className="app_icon"></span>Path</a></li>
            <li><a href="#"><span className="app_icon"></span>Kakao friends</a></li>
            </ul>
          </section>
          </main>

      <Tab />

    </body>
  )
}

export default More