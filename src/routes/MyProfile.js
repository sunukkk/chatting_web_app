import React, { useEffect, useState } from 'react'
import { updateProfile } from 'firebase/auth';
import { ref, uploadString, getDownloadURL, deleteObject  } from "firebase/storage";
import { db, storage } from '../fbase';
import {onSnapshot, deleteField, deleteDoc, setDoc, doc } from 'firebase/firestore';

import '../styles/profile.scss'
import { FaCheckCircle, FaFileUpload, FaTimes, FaTimesCircle, FaUserAlt } from 'react-icons/fa';
import Header from '../components/Header';



function MyProfile({userObj}) {
  
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newProfileMessage, setNewProfileMessage] = useState("");
  const [newProfileImg, setNewProfileImg] = useState(userObj.photoURL);
  const [newBgImg, setNewBgImg] = useState("");



  console.log(userObj)
  
  const onDisplayNameChange = e => {
    const {target: {value}} = e;
    setNewDisplayName(value);
  };

  const onProfileMessageChange = (e) =>{
    const {target: {value}} = e;
    setNewProfileMessage(value)
    
  }
  const onEditClick = async () => {
    try {
      if (userObj.displayName !== newDisplayName) {
        await updateProfile(userObj, {
          displayName: newDisplayName,
        });
      } else {
        const docRef = await setDoc(doc(db, `${userObj.uid}/ProfileMessage`), {
          creatorId: userObj.uid,
          createdAt: Date.now(),
          message: newProfileMessage,
        });
      } 
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  

  const ProfileImgClick = () =>{
    const profileImgForm = document.querySelector('.profile_img_form');
    if(profileImgForm.classList.contains('active')){
      profileImgForm.classList.remove('active')
    } else {
      profileImgForm.classList.add('active');}
  }

  const onFileChange = (e) =>{
    const {target: {files}} = e;
    const theFile = files[0]

    if(!theFile){
      return;
    }


    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
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
        const storageRef = ref(storage, `${userObj.uid}/profileImg`);
        const response = await uploadString(storageRef, newProfileImg, 'data_url');
        newProfileImgUrl = await getDownloadURL(ref(storage, response.ref))
        await updateProfile(userObj,{
          photoURL : newProfileImgUrl
        });
      }
    } catch (e){
      console.error("Error adding document: ", e);
    }
    const profileImgForm = document.querySelector('.profile_img_form');
    profileImgForm.classList.remove('active');
  }

  const onRemoveClick = async () => {
    const ok = window.confirm("프로필 사진을 삭제하시겠습니까?");
    if (ok) {
      try {
        const storageRef = ref(storage, userObj.photoURL);
        await deleteObject(storageRef);
        await updateProfile(userObj,{
          photoURL : ''
        });
        ;
      } catch (e) {
        console.error("Error deleting image: ", e);
      }
      setNewProfileImg("");
      const profileImgForm = document.querySelector('.profile_img_form');
      profileImgForm.classList.remove('active');
    }
  }; 
  
  useEffect(() => {
    const bgRef = doc(db, `${userObj.uid}/ProfileBgImg`);
    const bgUnsubscribe = onSnapshot(bgRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setNewBgImg(data.newBgImgUrl);
      }
    });

    const msgRef = doc(db, `${userObj.uid}/ProfileMessage`);
    const msgUnsubscribe = onSnapshot(msgRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setNewProfileMessage(data.message);
      }
    });

    return () => {
      bgUnsubscribe();
      msgUnsubscribe();
    };
  }, [userObj.uid]);


  const BgClick = () =>{
    const profileBgForm = document.querySelector('.profile_bg_form');
    if(profileBgForm.classList.contains('active')){
      profileBgForm.classList.remove('active')
    } else {
      profileBgForm.classList.add('active');}
  }
  
  const onBgFileChange = (e) =>{
    const {target: {files}} = e;
    const theBgFile = files[0]
    console.log('theBgFile ->', theBgFile)

    if(!theBgFile)return;

    const BgReader = new FileReader();
    BgReader.onloadend = (finishedEvent) =>{
      const {currentTarget:{result}} = finishedEvent;
      setNewBgImg(result);
    }
    BgReader.readAsDataURL(theBgFile)
    
  }

  const onBgImgSubmit = async e =>{
    e.preventDefault();
  
    try{
      let newBgImgUrl = "";
      if(newBgImg !==""){
        const storageRef = ref(storage, `${userObj.uid}/ProfileBgImg`);
        const response = await uploadString(storageRef, newBgImg, 'data_url');
        newBgImgUrl = await getDownloadURL(ref(storage, response.ref))
      }
      const docRef = await setDoc(doc(db, `${userObj.uid}/ProfileBgImg`), {
        creatorId: userObj.uid,
        createdAt: Date.now(),
        newBgImgUrl
      });
  
      setNewBgImg(newBgImgUrl);
      const profileBgForm = document.querySelector('.profile_bg_form');
      profileBgForm.classList.remove('active');
  
    } catch (e){
      console.error("Error adding document: ", e);
     
    }

  }
  
  const onBgRemoveClick = async () => {
    const ok = window.confirm("프로필 배경화면을 삭제하시겠습니까?")
    if(ok){
      try {
        setNewBgImg(''); 
        const storageRef = ref(storage, `${userObj.uid}/ProfileBgImg`);
        await deleteObject(ref(storage, storageRef));

        const docRef = ref(db,`${userObj.uid}/ProfileBgImg`);
        await deleteDoc(docRef, {
          newBgImgUrl: deleteField()
        })
        

      } catch (error) {
        console.error("Error removing background image: ", error);
      }
    } 
  }
  
  return (
    
    <>
    <Header left={<FaTimes />} right={<FaUserAlt/>} isTransparent="true"/>

    <body>
    
    <main className='profile-main'>
    
      <section className="background" style={newBgImg ? {backgroundImage: `url(${newBgImg})`} : {backgroundImage:null}} onClick = {BgClick}>
      <form className={`profile_bg_form`} onSubmit={onBgImgSubmit}>
          <label htmlFor="profile_bg_file" className='profile_file'><FaFileUpload/>
            <input className=' blind' id='profile_bg_file' type="file" accept="image/*" onChange={onBgFileChange}/>
          </label>
          <label htmlFor="profile_bg_submit" className='profile_submit'><FaCheckCircle />
            <input className='blind' id='profile_bg_submit' type="submit" />
          </label>
          <label htmlFor="profile_bg_remove" className='profile_remove'><FaTimesCircle />
            <button className='blind' id='profile_bg_remove' onClick = {onBgRemoveClick}>Remove</button>
          </label>
        </form>
        
        <h2 className="blind" >프로필</h2>
      </section>
      <section className="profile">
        <h2 className="blind">My Profile info</h2>
        <div className="profile_center_img empty" style={newProfileImg ? {backgroundImage: `url(${newProfileImg})`} :{backgroundImage: ''}} onClick = {ProfileImgClick}>
          <form className='profile_img_form' onSubmit={onImgSubmit}>
            <label htmlFor="profile_file" className='profile_file'><FaFileUpload/>
            <input className='blind' id='profile_file' type="file" accept='image/*' onChange={onFileChange}/>
            </label>
            <label htmlFor="profile_submit" className='profile_submit'><FaCheckCircle />
            <input className='blind' id='profile_submit' type="submit" value="Update Profile Image" />              
            </label>
            <label htmlFor="profile_remove" className='profile_remove'><FaTimesCircle />
            <button className='blind' id='profile_remove' onClick = {onRemoveClick}> Remove </button>
            </label>
          </form>
        </div>

        <div className="profile_cont">
          <input type="text" className="profile_name" placeholder="What's your name?" value={newDisplayName} onChange={onDisplayNameChange} />
          <input type="mail" className="profile_email" value={userObj.email} />
          <input type="text" className="profile_message" placeholder="What's on your mind" value={newProfileMessage ? `${newProfileMessage}` : ''} onChange={onProfileMessageChange}/>
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
    </>
  )
}

export default MyProfile