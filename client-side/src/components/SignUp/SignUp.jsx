import React, { useState } from 'react'
import user_icon from './person.png'
import password_icon from './password.png'
import './SignUp.scss'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const navigate=useNavigate()
  const email=localStorage.getItem('email');
  // console.log(email);
  
    const [user,setUser]=useState({
      email:email,
      username:"",
      password:"",
      cpassword:"",
    })

    const handleChange=(e)=>{
      // console.log(e.target.value);
      setUser((pre)=>({...pre,[e.target.name]:e.target.value}))
    }

    const handleSubmit=async(e)=>{
      e.preventDefault()
      const res =await axios.post("http://localhost:3001/api/signup",user)
      console.log(res);
      if(res.status==200){
        alert(res.data.msg)
        localStorage.removeItem("email")
        navigate('/signin')

      }
      else{
        alert(res.data.msg)


      }
      


    }

  return (
   <>
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        
      <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" id='username' name='username' placeholder='Username' onChange={handleChange} value={user.username} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" id='password' name='password' placeholder='Password' onChange={handleChange} value={user.password} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" id='cpassword' name='cpassword' placeholder=' Confirm password' onChange={handleChange} value={user.cpassword}  />
        </div>
       

      </div>
      <div className="submit-container">
        <Link to={'/signin'}   style={{textDecoration:"none"}}><div className="submit" onClick={handleSubmit}>Register</div></Link>
       

      </div>
     </div>
   </>
  )
}

export default SignUp