import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/tab.scss';
import { FaComment, FaEllipsisH, FaSearch, FaUser } from 'react-icons/fa';

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
            <FaUser className='ico'/><span>Friends</span>
          </Link>
        </li>
        <li>
          <Link to="/chats" className={setActiveClass('chats')} onClick={() => tabClick('chats')}>
            <FaComment className='ico'/><span>Chats</span>
          </Link>
        </li>
        <li>
          <Link to="/find" className={setActiveClass('find')} onClick={() => tabClick('find')}>
            <FaSearch className='ico'/><span>Find</span>
          </Link>
        </li>
        <li >
          <Link to="/more" className={setActiveClass('more')} onClick={() => tabClick('more')}>
            <FaEllipsisH className='ico'/><span>More</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Tab;
