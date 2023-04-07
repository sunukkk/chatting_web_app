import React, { useEffect, useState } from 'react'
import { updateProfile } from 'firebase/auth';
import { ref, uploadString, getDownloadURL, deleteObject  } from "firebase/storage";
import { db, storage } from '../fbase';
import { addDoc, collection, onSnapshot, orderBy, query, deleteDoc, getDocs } from 'firebase/firestore';

import '../styles/profile.scss'
import { FaTimes, FaUserAlt } from 'react-icons/fa';
import Header from '../components/Header';



function MyProfile({userObj}) {
  
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newProfileImg, setNewProfileImg] = useState(userObj.photoURL)
  const [newBgImg, setNewBgImg] = useState("")


  const onDisplayNameChange = e => {
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
    console.log({newProfileImg})
  }

  const onRemoveClick = async () => {
    const ok = window.confirm("프로필 사진을 삭제하시겠습니까?");
    if (ok) {
      try {
        const storageRef = ref(storage, userObj.photoURL);
        await deleteObject(storageRef);
        await updateProfile(userObj, {
          photoURL: "",
        })
        ;
      } catch (e) {
        console.error("Error deleting image: ", e);
      }
      setNewProfileImg("");
    }
  };

  useEffect(() => {
    const q = query(collection(db, `${userObj.uid}`),
    orderBy("createdAt", "desc")) 
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      newArray.splice(0, newArray.length)

      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(newArray);
      if (newArray.length > 0) {
        setNewBgImg(newArray[0].newBgImgUrl);
      }
    });
      },[userObj.uid]);
   


  const onBgFileChange = (e) =>{
    const {target: {files}} = e;
    const theBgFile = files[0]
    console.log('theBgFile ->', theBgFile)

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
      const docRef = await addDoc(collection(db, `${userObj.uid}`), {
        creatorId: userObj.uid,
        createdAt: Date.now(),
        newBgImgUrl
      });
  
      setNewBgImg(newBgImgUrl);
  
    } catch (e){
      console.error("Error adding document: ", e);
    }
  }
  
  const onBgRemoveClick = async () => {
    const ok = window.confirm("프로필 배경화면을 삭제하시겠습니까?")
    if(ok){
      try {
        const storageRef = ref(storage, `${userObj.uid}/ProfileBgImg`);
        await deleteObject(ref(storage, storageRef));

        const docRef = query(collection(db, `${userObj.uid}`));
        const snapshot = await getDocs(docRef);
        snapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });

        setNewBgImg("");

      } catch (error) {
        console.error("Error removing background image: ", error);
      }
      
    }  
  }
  
  return (
    
    <>
    <Header left={<FaTimes />} right={<FaUserAlt/>} isProfile="true"/>

    <body>
    
    <main className='profile-main'>
    
      <section className="background" style={newBgImg ? {backgroundImage: `url(${newBgImg})`} :{backgroundImage: ''} }>
        <form onSubmit={onBgImgSubmit}>
          <input type="file" accept="image/*" onChange={onBgFileChange}/>
          <input type="submit" value="Update Profile Background Image" />
          <button onClick = {onBgRemoveClick}>Remove</button>
        </form>
        
        <h2 className="blind" >프로필</h2>
      </section>
      <section className="profile">
        <h2 className="blind">My Profile info</h2>
        <div className="profile_center_img empty" 
                  style={newProfileImg ? {backgroundImage: `url(${newProfileImg})`} :{backgroundImage: ''}}>
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
    </>
  )
}

export default MyProfile