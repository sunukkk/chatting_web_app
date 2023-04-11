import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db, storage } from '../fbase';
import { ref, deleteObject } from "firebase/storage";

function Comment(props) {
  const {chatObj: {text, id, attachmentUrl}, isOwner, createdAt, userObj} = props;
  const [editing, setEditing] = useState(false)  
  const [newComment, setNewComment] = useState(text)

  const createdAtDate = new Date(createdAt)
  const chatHour = createdAtDate.getHours();
  const chatMin = createdAtDate.getMinutes();



  const onDeleteClcik = async (e) =>{
    const ok = window.confirm("삭제하시겠습니까?")
     if(ok) {
      await deleteDoc(doc(db, userObj.uid, `/${id}`));
      if(attachmentUrl !==""){
        const desertRef = ref(storage, attachmentUrl);
        await deleteObject(desertRef);
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

  return (
  
    <div>
      {editing ? (
        <>
          <form on onSubmit={onSubmit}>
            <input type="text" onChange={onChange} value={newComment} />
            
            <button>Edit</button>
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{text}</h4><span>{chatHour}:{chatMin}</span>
          {attachmentUrl && <img src={attachmentUrl} width="120" height ="120" alt="" />}
          {isOwner && (
            <>
            <form onSub></form>
              <button onClick={onDeleteClcik}>Delete chat</button>
              <button onClick={toggleEditing}>Edit chat</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Comment
