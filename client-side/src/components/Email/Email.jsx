import React, { useState } from 'react'
import './Email.scss'
import email_icon from './email.png'
import { Link,useNavigate } from 'react-router-dom'

import axios from 'axios'


const Email = () => {
  const [email,setEmail]=useState("")
  const navigate=useNavigate()

  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const res = await axios.post("http://localhost:3001/api/checkemail",{email})
    console.log(res);
    if(res.status==201){
      alert(res.data.msg)
      localStorage.setItem('email',email)
      navigate('/signin')
    }
    else{
      alert(res.data.msg)
    }
  }

  // asd=()=>{
  //   const res=await axios.post("http://localhost",{email},{})
  // }
  return (
    <>
        <div className="email-container">
      <div className="header">
        <div className="text">Email verification</div>
       
      </div>
      <div className="inputs">
        
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" id='email' name='email' placeholder='Email' onChange={handleChange}  />
        </div>
        
       

      </div>
      <div className="submit-container">
        <Link to={'/email'}  style={{textDecoration:"none"}}><div className="submit" onClick={handleSubmit} >Verify</div></Link>
       

      </div>
     </div>
    </>
  )
}

export default Email