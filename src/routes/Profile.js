import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { updateProfile } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL, deleteObject  } from "firebase/storage";
import { storage } from '../fbase';

import '../styles/profile.scss'




function Profile({userObj}) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newProfileImg, setNewProfileImg] = useState("")


    
  const onDisplayNameChange = (e) => {
    const {target: {value}} = e;
    setNewDisplayName(value);
  };


  const onEditClick = async e =>{
    try{
      if(userObj.displayName !== newDisplayName ){
        await updateProfile(userObj,{
          displayName:newDisplayName,
        })
      }
    } catch (e){
      console.error("Error adding document: ", e);
    }
    console.log(userObj)
  }
  
  const onFileChange = (e) =>{
    
    const {target: {files}} = e;
    
    const theFile = files[0]
    console.log('theFile ->', theFile)

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
      console.log('finishedEvent =>', finishedEvent)
      const {currentTarget:{result}} = finishedEvent;
      setNewProfileImg(result);
    }
    reader.readAsDataURL(theFile)
  }

  const onImgSubmit = async e =>{
    e.preventDefault();
    
    try{
      let newProfileImgUrl = "";

      if(newProfileImg !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, newProfileImg, 'data_url');
        newProfileImgUrl = await getDownloadURL(ref(storage, response.ref))
        await updateProfile(userObj,{
          photoURL : newProfileImgUrl
        });
      }
    } catch (e){
      console.error("Error adding document: ", e);
    }
    console.log(userObj)
  }


  const onRemoveClick = async () => {
    const ok = window.confirm("프로필 사진을 삭제하시겠습니까?");
    if (ok) {
      try {
        const storageRef = ref(storage, userObj.photoURL);
        await deleteObject(storageRef);
        await updateProfile(userObj, {
          photoURL: "",
        });
      } catch (e) {
        console.error("Error deleting image: ", e);
      }
    }
  };


  return (
    <body>
    <header className='profile-header'>
      <div className="status_bar">
        <div className="left_item">
          <i className="fa-solid fa-plane"></i>
          <i className="fa-solid fa-wifi"></i>
        </div>
    
        <div className="center_item">
          <span>00</span>:<span>00</span>
        </div>
    
        <div className="right_item">
          <i className="fa-solid fa-moon"></i>
          <i className="fa-brands fa-bluetooth-b"></i>
          <span><span>100</span>%</span>
          <i className="fa-solid fa-battery-full"></i>
        </div>
    
      </div>
      <div className="title_bar">
        <h1 className="blind">Profile</h1>
        <div className="left_item"><Link to= "/"><i className="fa-solid fa-xmark"></i></Link></div>
        <div className="right_item"><a href="#"><i className="fa-solid fa-user"></i></a></div>
      </div>
    
    </header>
    <hr />
    
    <main className='profile-main'>
    
      <section className="background" style = {{backgroundImage : ''}}>
        <h2 className="blind" ></h2>
      </section>
      <section className="profile">
        <h2 className="blind">My Profile info</h2>
        <div className="profile_center_img empty" 
                  style={newProfileImg ? {backgroundImage: `url(${newProfileImg})`} : { backgroundImage: `url(${userObj.photoURL})` }}>
          <form onSubmit={onImgSubmit}>
            <input type="file" accept='image/*' onChange={onFileChange}/>
            <input type="submit" value="Update Profile Image" />              
            <button onClick = {onRemoveClick}> Remove </button>
          </form>
        </div>

        <div className="profile_cont">
          <input type="text" className="profile_name" placeholder="What's your name?" value={newDisplayName} onChange={onDisplayNameChange} />
          <input type="mail" className="profile_email" value={userObj.email} />

          <ul className="profile_menu">
          <li>
            <button>
              <span className="icon">
                <i className="fa-regular fa-comment"></i>
              </span>
              My Chatroom
              </button>
          </li>
          <li>
            <button onClick = {onEditClick}>
              <span className="icon">
                <i className="fa-solid fa-pencil"></i>
              </span>
              Edit Profile
            </button>
          </li>
          </ul>
        </div>
      </section>
      
      
    </main>
    
    <hr />
    
    
    </body>
  )
}

export default Profile