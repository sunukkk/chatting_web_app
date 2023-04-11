import React, { useState } from 'react'
import {authService} from '../fbase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";


function Auth() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [newAccount, setNewAccount] = useState(true); // true 회원가입, false 로그인
const [error, setError] = useState('');

const onChange = (e) => {
  const {target:{name, value}} = e;
  if(name ==='email'){
    setEmail(value);
  }else if(name === 'password'){
    setPassword(value)
  }
} 

const onSubmit = async (e) => {
  e.preventDefault();

  try{
    let data;
    if(newAccount){
      //회원가입
      data = await createUserWithEmailAndPassword(authService, email, password);
    } else {
      data = await signInWithEmailAndPassword(authService, email, password);
    }
    console.log(data);
  } catch(error) {
      console.log('error->', error);
      setError(error.message)
  }
}

const toggleAccount = () => setNewAccount(prev => !prev)

const onSocialClick = async (e) => {

  let provider
  const {target:{name}} = e
  if(name === "google"){
    provider = new GoogleAuthProvider();

  }else if(name === "github"){
    provider = new GithubAuthProvider();

  }
  const data = await signInWithPopup(authService, provider)
  console.log('data ->',data)
}

  return (
    <>
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder = "Email" required value={email} onChange={onChange}/>
        <input name="password" type="password" placeholder = "Password" required value={password} onChange={onChange}/>
        <input type="submit" value = {newAccount ? "Create Account" : "Log In"}/>
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account" }
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with GitHub</button>
      </div>
    </div>
    </>
  )
}

export default Auth