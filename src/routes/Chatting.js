import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { db, storage } from '../fbase';
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import Header from "../components/Header"
import Comment from "../components/Comment"
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from "firebase/storage";


import '../styles/chatting.scss'
import { FaAngleLeft, FaMicrophone, FaPaperPlane, FaPlus, FaRegSmile, FaTimes } from 'react-icons/fa';

function Chatting({ userObj }) {
    
  const { friendName, friendEmail, profileImg, profileBg, friendId } = useLocation().state;
  console.log(useLocation().state)

  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  
  const [attachment, setAttachment] = useState("");

  
  useEffect(() => {
    const q = query(collection(db, `${friendId} ${userObj.uid}`), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((data) => data.text || data.attachmentUrl); // text 또는 attachmentUrl key가 없는 원소들은 제외
      setChats(newArray);
    });

   }, [userObj.uid]);


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
      const storageRef = ref(storage, `${friendId} ${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, 'data_url')
        console.log('response -->', response)
      attachmentUrl = await getDownloadURL(ref(storage, response.ref))
      }
      const docRef = await addDoc(collection(db, `${friendId} ${userObj.uid}` ), {
        text: chat,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl
      });

      console.log("Document written with ID: ", docRef.id);

      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
      
    } catch (e){
      console.error("Error adding document: ", e);
    }
    setChat("");
    setAttachment("");
    
    
  }

  const onFileChange = e =>{
    
    const{target:{files}} = e;
    const theFile=files[0];
    
    setAttachment("");

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
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
    
    <div className='chatting-body'>
      <Header left = {<FaAngleLeft/>} title = {friendName} isTransparent={true}/>

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
                                
          <Link to={'/profile'} state = {{name : friendName, email : friendEmail, profileImg : profileImg, profileBg : profileBg}}>
            <span className="chatting_profile_img empty" style={{ backgroundImage: `url(${profileImg})` }}></span></Link>
          <span className="chatting_profile_name">{friendName}</span>
        </div>
        <span className="chat">And this is an answer</span>
        <span className="chat">And this is an answer And this is an answer</span>
        <span className="chat">And this is an answer</span>
        <span className="chat_time"><span>17</span>:<span>33</span></span>
      </div>
      <div className='chat_box my' >
      {chats.map((chat) => (
        <div key={chat.id} className='chat' >
          <Comment chatObj={chat} isOwner={chat.creatorId === userObj.uid} createdAt={chat.createdAt} userObj={userObj} />
        </div>
      ))}
      </div>
    </main>

    <footer>
      
      <form onSubmit={onSubmit}>
        <fieldset className="text_box">
          <legend className="blind">채팅입력창</legend>
            <label htmlFor="upload-file" className='plus_btn'>
              <FaPlus />
            </label>
            <label htmlFor="upload-file">
              <input className='blind' type='file' accept='image/*' name='plus_btn' id='upload-file' onChange={onFileChange} />
            </label>
            <label htmlFor="upload-file" className="blind">채팅 입력</label>
            <input type="text" id="chatting" className="text_field" value = {chat} onChange={onChange}/>
            <label htmlFor="chat_submit" className='chat_submit'><FaPaperPlane />
            <input type="submit" id='chat_submit' className='blind'/></label>
            <span className="emoticon_btn"><Link><FaRegSmile/></Link></span>
            <span className="voice_btn"><Link><FaMicrophone /></Link></span>
            {attachment &&(
              <div className='attachment'>
                <img className='attachment_img' src={attachment} width='100' height='100' alt=""/>
                <label htmlFor="button_delete"><FaTimes />
                  <button className='blind' id='button_delete' onClick={onclearAttachment}>Remove</button>
                </label>
              </div>
            )}
        </fieldset>
      </form>
    </footer>
    
    </div>

    </>
  )
}

export default Chatting