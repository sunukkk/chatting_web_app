import React from 'react'
import '../styles/header.scss'
import { Link } from 'react-router-dom'
import { FaBatteryHalf, FaBluetooth, FaMoon, FaPlane, FaWifi } from 'react-icons/fa'
function Header({left, title, span, right, isTransparent}) {
  if(left === undefined){left = ''}
  if(title === undefined){title = ''}
  if(span === undefined){span = ''}
  if(right === undefined){right = ''}

  const headerClassName = isTransparent ? 'header transparent' : 'header';
  const time = new Date()
  const nowHour = time.getHours();
  const nowMinutes = time.getMinutes();
  return (

    <header>
      <div className= {`header_container ${headerClassName}`}>

        <div className="status_bar">
          <div className="left_item">
            <FaPlane />
            <FaWifi />
          </div>

          <div className="center_item">
            <span>{nowHour}</span> : <span>{nowMinutes}</span>   
          </div>

          <div className="right_item">
            <FaMoon />
            <FaBluetooth />
            <span>100%</span>
            <FaBatteryHalf />
          </div>
  
        </div>
        <div className="title_bar">
            <h1> {title} <span>{span}</span></h1>
            <div className="left_item"><Link to='/'>{left}</Link></div>
            <div className="right_item">{right}</div>
          </div>
      </div>



</header>

  )
}

export default Header