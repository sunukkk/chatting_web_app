import React from 'react'
import '../styles/header.scss'
import { Link } from 'react-router-dom'

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
    
  <body>
    <header className={headerClassName}>
      <div className="status_bar">
        <div className="left_item">
          <i className="fa-solid fa-plane"></i>
          <i className="fa-solid fa-wifi"></i>
        </div>

        <div className="center_item">
          <span>{nowHour}</span> : <span>{nowMinutes}</span>   
        </div>

        <div className="right_item">
          <i className="fa-solid fa-moon"></i>
          <i className="fa-brands fa-bluetooth-b"></i>
          <span><span>100</span>%</span>
          <i className="fa-solid fa-battery-full"></i>
        </div>

      </div>

  <div className="title_bar">
    <h1> {title} <span>{span}</span></h1>
    <div className="left_item"><Link to='/'>{left}</Link></div>
    <div className="right_item"><a href="#">{right}</a></div>
  </div>

</header>
</body>
  )
}

export default Header