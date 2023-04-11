import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db, storage } from '../fbase';
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import Comment from "../components/Comment"
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from "firebase/storage";


import '../styles/chatting.scss'

function Chatting({userObj}) {
    console.log(userObj)
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
    const q = query(collection(db, userObj.uid),
                    orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
        setChats(newArray.reverse());
      });
    },[]);

    
  const onChange = e =>{
    e.preventDefault();
    const {target: {value}} = e;
    setChat(value);
  }

  const onSubmit = async (e) =>{
    e.preventDefault();

    if(!chat && !attachment) return;

    try{
      let attachmentUrl = "";
      if(attachment !==""){
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, 'data_url')
        console.log('response -->', response)
      attachmentUrl = await getDownloadURL(ref(storage, response.ref))
      }
      const docRef = await addDoc(collection(db,            userObj.uid         ), {
        text: chat,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl
      });
      console.log("Document written with ID: ", docRef.id);
      
    } catch (e){
      console.error("Error adding document: ", e);
    }
    setChat("");
    setAttachment("");
  }

  const onFileChange = e =>{
    console.log('e->', e)
    const{target:{files}} = e;
    const theFile=files[0];
    console.log(theFile)
    
    setAttachment("");

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
      console.log('finishedEvent ->', finishedEvent)
      const {currentTarget:{result}} = finishedEvent;
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
    e.target.value = '';
  }

  const onclearAttachment = e =>{
    e.preventDefault();
    setAttachment("");
  }
  return (
    <>
    
    <body className='chatting-body'>
  <header>
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
    <h1>friendname</h1>
    <div className="left_item"><Link to = "/chats"><i className="fa-solid fa-angle-left"></i></Link></div>
    <div className="right_item"><a href="#"><i className="fa-solid fa-magnifying-glass"></i><i className="fa-solid fa-bars"></i></a></div>
  </div>
  </header>

    <main className='chatting-main'>
      <span className="date_info">Monday, January, 1, 2023</span>
      <div className="chat_box my">
        <span className="chat">Hello!</span>
        <span className="chat">Hello! This is a test message. Hello! This is a test message. This is a test message.</span>
        <span className="chat">This is a test message.</span>
        <span className="chat_time"><span>00</span>:<span>00</span></span>
      </div>
      <div className="chat_box other">
        <div className="other_info">
          <a href="#"><span className="chatting_profile_img empty"></span></a>
          <span className="chatting_profile_name">Friend Name</span>
        </div>
        <span className="chat">And this is an answer</span>
        <span className="chat">And this is an answer And this is an answer</span>
        <span className="chat">And this is an answer</span>
        <span className="chat_time"><span>17</span>:<span>33</span></span>
      </div>
      <div>
      {chats.map((chat) => (
        <div key={chat.id}>
          <Comment chatObj={chat} isOwner={chat.creatorId === userObj.uid} createdAt={chat.createdAt} />
        </div>
      ))}
      </div>
    </main>

    <footer>
      
      <form onSubmit={onSubmit}>
        <fieldset className="text_box">
          <legend className="blind">채팅입력창</legend>
            <label htmlFor="upload-file" className='plus_btn'>
              <i class="fa-solid fa-plus"></i>
            </label>
            <input type='file' accept='image/*' name='plus_btn' id='upload-file' onChange={onFileChange} />
            <label htmlFor="upload-file" className="blind">채팅 입력</label>
            <input type="text" id="chatting" className="text_field" value = {chat} onChange={onChange}/>
            <input type="submit" />
            <span className="emoticon_btn"><a href="#"><i className="fa-regular fa-face-smile"></i></a></span>
            <span className="voice_btn"><a href="#"><i className="fa-solid fa-microphone"></i></a></span>
            {attachment &&(
              <div className='attachment'>
                <img className='attachment_img' src={attachment} width='100' height='100' alt=""/>
                <button onClick={onclearAttachment}>Remove</button>
              </div>
            )}
        </fieldset>
      </form>
    </footer>
    
    </body>

    </>
  )
}

export default Chatting