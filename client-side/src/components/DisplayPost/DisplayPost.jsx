import React, { useEffect, useState } from 'react'
import './DisplayPost.scss'
import axios from 'axios'

const DisplayPost = () => {
    const token= localStorage.getItem("Token")
    const [data,setData]=useState({})
    const [photos,setPhotos]=useState([])
    useEffect(()=>{getPosts()},[])
    const getPosts=async()=>{
        const res= await axios.get("http://localhost:3001/api/",{headers:{"Authorization":`Bearer ${token}`}})
        console.log(res)
        if(res.status==200){
           
            
        }
       
        
    }
  return (
    <div className='PostD'>
      <div className="left">
      {photos.map((photo,ind)=><img key={ind} src={photo} alt='post'/>)} 
      </div>
      <div className="right">
        <label htmlFor="desc">
            Description:{data.description}
        </label>
       <h3 id='desc'></h3>
        <label htmlFor="date">Date:{data.postedDate}</label>
       <h3 id='date'></h3>
        <label htmlFor="time">Time:{data.postedTime}</label>
       <h3 id='time'></h3>
      </div>
    </div>
  )
}

export default DisplayPost