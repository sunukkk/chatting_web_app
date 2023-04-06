import React from 'react'
import Header from '../components/Header'
import Tab from '../components/Tab'

import { Link } from 'react-router-dom'

import '../styles/chats.scss'
import '../styles/tab.scss'


function Chats({friends}) {

  return (
    <body>
      <Header left='Edit' title='Chats' right='' />
        <main>
          <form className="search_box">
            <fieldset className="search_inner">
              <legend className="blind">검색창</legend>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="search" name="search" id="search" placeholder="Find Friends, chats, Plus Friends" />
            </fieldset>
          </form>

          <section className="main_section">
            <header><h2>Friends</h2></header>
            <ul>
              {friends.map((friends, index) => 
                <li key={index}>
                <Link to ={"/chatting"}>
                  <span className="chats_img empty" style = {{backgroundImage : `url(${friends.profileImg})`}}></span>
                  <span className="chats_cont">
                    <span className="chats_name">{friends.name}</span>
                    <span className="chats_latest">{friends.lastChat}</span>
                  </span>
                  <span className="chats_time"><span>00</span>:<span>00</span></span>
                </Link>
              </li>
            )}
            </ul>
          </section>

          <div className="chat_fa_btn">
            <a href="#">
              <i className="fa-solid fa-comment"></i>
            </a>
          </div>
        </main>

      <Tab />

      </body>
  )
}

export default Chats