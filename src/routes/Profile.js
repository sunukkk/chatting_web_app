
import { Link, useLocation } from 'react-router-dom';
import '../styles/profile.scss'

import { FaTimes  } from 'react-icons/fa';
import Header from '../components/Header';

function Profile() {
  const { name, email, profileImg, profileBg } = useLocation().state;

  
  return (
    <>
    <body>
    <Header left={<FaTimes />} isTransparent="true"/>
    <hr />
    
    <main className='profile-main'>
    
      <section className="background" style={{backgroundImage: `url(${profileBg})`}}>
        <h2 className="blind" >Profile</h2>
      </section>

      <section className="profile">
        <h2 className="blind">Profile info</h2>
        <div className="profile_center_img empty" style={{backgroundImage: `url(${profileImg})`}}>
        </div>

        <div className="profile_cont">
          <input type="text" className="profile_name" placeholder="What's your name?" value={name}/>
          <input type="mail" className="profile_email" value={email} />

          <ul className="profile_menu">
          <li>
            <button>
              <Link to={`/chatting`} state = {{friendName: name}}>
              <span className="icon">
                <i className="fa-regular fa-comment"></i>
              </span>
              Chatroom
              </Link>
            </button>
          </li>

          </ul>
        </div>
        
      </section>
     
    </main>
    
    <hr />
    
    
    </body>
    </>
  )
}
export default Profile