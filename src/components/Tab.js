import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/tab.scss';

function Tab() {
  const [activeTab, setActiveTab] = useState('home');
  const location = useLocation();

  const tabClick = (tabName) => {
    setActiveTab(tabName);
  }

  const setActiveClass = (tabName) => {
    return location.pathname === `/${tabName}` ? 'on' : '';
  }

 
  return (
    <nav className="tab_bar">
      <ul>
        <li>
          <Link to="/" className={setActiveClass('')} onClick={() => tabClick('home')} >
            <i className="fa-solid fa-user"></i><span>Friends</span>
          </Link>
        </li>
        <li>
          <Link to="/chats" className={setActiveClass('chats')} onClick={() => tabClick('chats')}>
            <i className="fa-solid fa-comment"></i><span>Chats</span>
          </Link>
        </li>
        <li>
          <Link to="/find" className={setActiveClass('find')} onClick={() => tabClick('find')}>
            <i className="fa-solid fa-magnifying-glass"></i><span>Find</span>
          </Link>
        </li>
        <li >
          <Link to="/more" className={setActiveClass('more')} onClick={() => tabClick('more')}>
            <i className="fa-solid fa-ellipsis"></i><span>More</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Tab;
