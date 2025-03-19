import React, { useState } from 'react'
import styles from '../styles/Signup.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../AuthProvider";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
      const [formData, setFormData] = useState({
        email:'',
        password:'',
      })
    const [loading,setLoading] = useState()
    const [error,setError] = useState()
    const {fetchUser }= useAuth()
    const navigate = useNavigate()
      const handleChange =(e)=>{
       setFormData({
        ...formData,
        [e.target.name]:e.target.value
       })
      }
    
      const handleSubmit= async(e)=>{
        e.preventDefault();
        setLoading(true)
       try {
        const response = await axios.post(`${API_BASE_URL}/api/users/login`,formData)
        if(response.status == 200){
          navigate("/")
          fetchUser()
        }
       } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
       }finally{
        setLoading(false)
       }
      }
      // forma validations are remaining in login and signup pages
  return (
    <div className={styles.mainContainer} >
          <div className={styles.formContainer}>
             <div className={styles.container}>
              <h1>Already have an account?</h1>
                <p>Your personal job finder is here</p>
                {error && <p className={styles.errorMessage}>{error}</p>}
                <form action="" onSubmit={handleSubmit} className={styles.loginForm}>
                  <input 
                    type="text"
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange} 
                  />
            
                  <input 
                    type="password"
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange} 
                  />
                 
                  <button type='submit'>{loading ? 'Logging...':'Sign In'}</button>
                </form>
                <p>Don’t have an account?<a onClick={()=>navigate('/signup')}>Sign Up</a></p>
             </div>
          </div>
            <div className={styles.imgContainer}>
             <p>Your Personal Job Finder</p>
            
            </div>
     </div>
  )
}

export default Login