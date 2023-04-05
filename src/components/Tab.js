import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/tab.scss';

function Tab() {
  const [activeTab, setActiveTab] = useState('home');

  const tabClick = (tabName) => {
    setActiveTab(tabName);
  }

  const setActiveClass = (tabName) => {
    return activeTab === tabName ? 'on' : '';
  }

  return (
    <nav className="tab_bar">
      <ul>
        <li className={setActiveClass('friends')} onClick={() => tabClick('friends')}>
          <Link to="/">
            <i className="fa-solid fa-user"></i>Friends
          </Link>
        </li>
        <li className={setActiveClass('chats')} onClick={() => tabClick('chats')}>
          <Link to="/chats">
            <i className="fa-solid fa-comment"></i>Chats
          </Link>
        </li>
        <li className={setActiveClass('find')} onClick={() => tabClick('find')}>
          <Link to="/find">
            <i className="fa-solid fa-magnifying-glass"></i>Find
          </Link>
        </li>
        <li className={setActiveClass('more')} onClick={() => tabClick('more')}>
          <Link to="/more">
            <i className="fa-solid fa-ellipsis"></i>More
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Tab;
