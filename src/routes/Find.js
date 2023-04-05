import React from 'react'
import Header from '../components/Header'
import Tab from '../components/Tab'
import '../styles/find.scss'
import '../styles/tab.scss'

function Find() {
  return (
    <body>
     <Header left ="Edit" title="Find" right=""/>

    <main>
      <ul className="find_method">
        <li><a href="#"><i className="fa-solid fa-address-book"></i>Find</a></li>
        <li><a href="#"><i className="fa-solid fa-qrcode"></i>QR Code</a></li>
        <li><a href="#"><i className="fa-solid fa-mobile-screen-button"></i>Shake</a></li>
        <li><a href="#"><i className="fa-solid fa-envelope"></i>SNS</a></li>
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