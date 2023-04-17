import React from 'react'
import Header from '../components/Header'
import Tab from '../components/Tab'
import '../styles/find.scss'
import '../styles/tab.scss'
import { Link } from 'react-router-dom'

function Find() {
  return (
    <body>
     <Header left ="Edit" title="Find" right=""/>

    <main>
      <ul className="find_method">
        <li><Link><i className="fa-solid fa-address-book"></i>Find</Link></li>
        <li><Link><i className="fa-solid fa-qrcode"></i>QR Code</Link></li>
        <li><Link><i className="fa-solid fa-mobile-screen-button"></i>Shake</Link></li>
        <li><Link><i className="fa-solid fa-envelope"></i>SNS</Link></li>
      </ul>

      <section className="recommend_section">
        <header><h2>Recommended Friends</h2></header>
        <ul>
        <li>You Have no recommended friends.</li>
        </ul>
      </section>
    </main>

    
    <Tab />
    

  </body>
  )
}

export default Find