import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = ({setUser,setProfile}) => {
  const navigate=useNavigate()
  const token = localStorage.getItem("Token")
  // console.log(token);

  useEffect(()=>{getUser()},[])
  
  const getUser=async()=>{
   if(token){
    try {
      const res= await axios.get("http://localhost:3001/api/getuser",{headers:{"Authorization":`Bearer ${token}`}})
      // console.log(res);
      if(res.status==200){
        setUser(res.data.username)
        if(res.data.profile){
          setProfile(res.data.profile.profile)
          
        }
      }
      else if(res.status==403){
        console.log("unauth");
        alert(res.data.msg)
        navigate('/signin')
      }
      else{
        navigate('/signin')

      }
      } catch (error) {
      console.log(error);
      navigate('/signin')
      
    }
   }
   else{
    navigate('/signin')
   }

  }
  return (
   <></>

  )
}

export default Home