
import { Link, useLocation } from 'react-router-dom';
import '../styles/profile.scss'

import { FaComment, FaTimes  } from 'react-icons/fa';
import Header from '../components/Header';

function Profile() {
   const { friendName, friendEmail, profileImg, profileBg, friendId } = useLocation().state;

   console.log(useLocation().state)
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
          <input type="text" className="profile_name" placeholder="What's your name?" value={friendName}/>
          <input type="mail" className="profile_email" value={friendEmail} />

          <ul className="profile_menu">
          <li>
            <button>
              <Link to={`/chatting`} state = {{friendId: friendId, friendName: friendName,friendEmail: friendEmail, profileImg: profileImg, profileBg: profileBg}}>
              <span className="icon">
                <FaComment />
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