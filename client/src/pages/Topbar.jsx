import React, { useState } from "react";
import style from "../styles/topbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import recruiterImg from '../assets/profile.png'
import axios from "axios";
import Swal from 'sweetalert2'

const Topbar = () => {
  const navigate =useNavigate()
  const {user,fetchUser }= useAuth()

  const handleLogout = ()=>{
    try {
      axios.post('http://localhost:5000/api/users/logout')
      .then((response)=>{
        if(response.status == 200){
          alert("You logged out successfuly")
          navigate("/")
          fetchUser()
        }
      })
    } catch (error) {
       const errorMessage =  error.response?.data?.message||'Something went wrong';
                  
            Swal.fire({
              title: 'Error!',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'OK'
          });
    }
  }
 
  return (
    <div className={style.topbar}>
      <div className={style.imageContainer}>
          <div className={style.heading}>
            <p>Job Finder</p>
          </div>
          <div className={style.btn}>
            {user ? (
              <div className={style.logoutContainer}>
                <button onClick={handleLogout}>Logout</button>
                <span>Hello! Recruiter</span>
                <span><img src={recruiterImg} alt="profile image" /></span>
              </div>
            ):(
            <>
             <button className={style.loginBtn } onClick={()=>navigate('/login')}>Login</button>
             <button className={style.registerBtn} onClick={()=>navigate('/signup')}>Register</button>
            </>
          )}
          </div>
      </div>
    </div>
  );
};

export default Topbar;
