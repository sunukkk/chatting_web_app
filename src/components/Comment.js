import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db, storage } from '../fbase';
import { ref, deleteObject } from "firebase/storage";

import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import '../styles/comment.scss'


function Comment(props) {
  const {chatObj: {text, id, attachmentUrl}, isOwner, createdAt, userObj} = props;
  const [editing, setEditing] = useState(false)  
  const [newComment, setNewComment] = useState(text)

  const createdAtDate = new Date(createdAt)
  const chatHour = createdAtDate.getHours();
  const chatMin = createdAtDate.getMinutes();

  const onDeleteClick = async (id) => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      try {
        await deleteDoc(doc(db, userObj.uid, id));
        if (attachmentUrl !== "") {
          const desertRef = ref(storage, attachmentUrl);
          await deleteObject(desertRef);
        }
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    }
  }

  const toggleEditing = () => setEditing((prev) => !prev)
  
  const onChange = e =>{
    const{target:{value}} = e
    setNewComment(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
 
    const newCommentRef = doc(db, userObj.uid, id);
  
    await updateDoc(newCommentRef, {
      text: newComment,
      //createdAt: Date.now()  //채팅내용을 수정할때 최하단으로 이동하고싶으면 주석 풀기
    });
    
    setEditing(false)
  }

  const ChatClick = (event) => {
    const chatCommentForm = event.target.closest('.chat_container').querySelector('.comment_form');
    if (chatCommentForm) {
      if (chatCommentForm.classList.contains('active')) {
        chatCommentForm.classList.remove('active');
      } else {
        chatCommentForm.classList.add('active');
      }
    }
  }

  
  return (
    <>
    <div className="chat_container" onClick={ChatClick}>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className='comment_edit_form'>
            <input className='comment_edit_textbox' type="text" onChange={onChange} value={newComment} />
            <label htmlFor="comment_button_edit" className='comment_button_edit'><FaPencilAlt />
              <button id='comment_buton_cancel' className='blind'>Edit</button>
            </label>
            <label htmlFor="comment_buton_cancel" className='comment_buton_cancel'><FaTimes />
              <button id='comment_buton_cancel' className='blind' onClick={toggleEditing}>Cancel</button>
            </label>
          </form>

        </>
      ) : (
        <>
          <h4>{text}</h4><span className='chat_time'>{chatHour}:{chatMin}</span>
          {attachmentUrl && <img src={attachmentUrl} width="120" height ="120" alt="" />}
          {isOwner && (
            <>
            <form className='comment_form' onSubmit={onSubmit}>
              <label htmlFor="comment_button_edit" className='comment_button_edit'><FaPencilAlt />
                <button className='blind' id ='comment_button_edit' onClick={toggleEditing}>Edit chat</button>
              </label>
              <label htmlFor="comment_button_delete" className='comment_button_delete'><FaTimes />
                <button className='blind' id='comment_button_delete' onClick={() => onDeleteClick(id)}>Delete chat</button>
              </label>

            </form>              
            </>
          )}
        </>
      )}
      </div>
  </>
  
  )
}

export default Comment
