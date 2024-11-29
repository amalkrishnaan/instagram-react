import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './Nav.css'
import user_icon from './person.png'


const Nav = ({user,setUser,profile}) => {
const navigate=useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="nav">
    <span className='heading'><Link to={'/'} style={{textDecoration:"none",color:"white",marginRight:"10px"}}>INSTAGRAM</Link></span>
   
    <div className="user-info">
    <h1>{user}</h1>
   <div className="image">
      <img className='profile' src={profile?profile:user_icon} alt="" onClick={toggleDropdown} />
      <div className="profile-dropdown">   
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                 <Link to={'/profile'}> <div style={{marginTop:"50px",fontSize:"35px",fontWeight:"900",marginLeft:"35px"}} >Profile</div></Link>
                </li>
                <li>
                 <button className='logout' onClick={()=>{

                  localStorage.removeItem('Token')
                  setUser("")
              navigate('/signin')
            }}>LOGOUT</button>
                </li>
              </ul>
              )}
              </div>
   </div>
    </div>
     </div>
  )
}

export default Nav