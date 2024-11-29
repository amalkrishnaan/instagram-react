import React, { useState } from 'react'
import './SignIn.scss'
import user_icon from '../SignUp/person.png'
import email_icon from '../SignUp/email.png'
import password_icon from '../SignUp/password.png'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'



const SignIn = () => {
  const navigate=useNavigate()

  const [loginData,setLoginData]=useState({
    email:"",
    password:""
  })

 

  const handleChange=(e)=>{
    setLoginData((pre)=>({...pre,[e.target.name]:e.target.value}))
    // console.log(loginData);
    
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const res = await axios.post("http://localhost:3001/api/signin",loginData);
    console.log(res);
    if(res.status==200){
      localStorage.setItem("Token",res.data.token)
      alert(res.data.msg)
      navigate('/')
    }
    else{
      alert(res.data.msg)
    }

  
  }
  
  return (
    <>
    
    <div className="signin-container">
      <div className="header">
        <div className="text">Sign In</div>
       
      </div>
      <div className="inputs">
      <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" id='email' name='email' value={loginData.email} placeholder='Email' onChange={handleChange}  />
        </div>
       
        
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" id='password' name='password'  value={loginData.password} placeholder='Password' onChange={handleChange} />
        </div>
        
       

      </div>
      <div className="submit-container">
      <Link  style={{textDecoration:"none"}}><div className="submit" onClick={handleSubmit}>Sign In</div>
      </Link>
      <Link to={'/email'} style={{textDecoration:"none"}}><div className="submit">Sign Up</div>
      </Link>
      </div>
      <Link   style={{textDecoration:"none"}}><div className="asd">Forgot Password?</div></Link>

     </div>
    
   </>
    
  )
}

export default SignIn