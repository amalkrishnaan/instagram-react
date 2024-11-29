import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './AddPost.scss'

const AddPost = () => {
    const navigate=useNavigate();
    const token=localStorage.getItem("Token");
    const [images,setImages]=useState([]);
    const [postedTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [postedDate, setCurrentDate] = useState(new Date().toLocaleDateString());
    const [description,setDescription]=useState("");

    const handleChange=(e)=>{
        setDescription(e.target.value)
      }

      const handleSubmit = async(e) => {
        e.preventDefault();
        setCurrentTime(new Date().toLocaleTimeString())
        console.log(postedDate,description,images,postedTime);
        const res=await axios.post("http://localhost:3001/api/addpost",{description,images,postedTime,postedDate},{headers:{"Authorization":`Bearer ${token}`}});
          console.log(res);
        if(res.status==201){
          alert(res.data.msg)
          navigate('/profile')
        }else{
          alert(res.data.msg)
        }
      };

       // Handle image change
  const handleFile=async(e)=>{
    const arr=Object.values(e.target.files)
    console.log(arr);
    arr.map(async(m)=>{
      const photo=await convertToBase64(m)
      setImages((pre)=>([...pre,photo]))
    })
  }
  function convertToBase64(file) {
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror= (error)=>{
            reject(error)
        }
    })
  }
  return (
    <div className='Post'>
      <h2>Add Post</h2>
      <form >
      <div>
          <label>Photo:</label>
          <input type="file" className='photo-input' onChange={handleFile} accept="image/*" multiple 
           alt="Profile"  />
           
        </div>
        <div>
          <label>Description:</label>
          <textarea  name='description' onChange={handleChange}  placeholder="Description" />
        </div>
        
        <button type="submit" onClick={handleSubmit}>Add Post</button>
      </form>
    </div>
    
  )
}

export default AddPost