import React, { useState } from 'react'
import styles from '../styles/Signup.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    mobile:'',
    password:'',
    terms:false
  })
  const [loading,setLoading] = useState()
  const [error,setError] = useState()
  const navigate = useNavigate()
  const handleChange =(e)=>{
    const {name,type,value,checked} = e.target;
   setFormData({
    ...formData,
    [name]:type === 'checkbox'? checked:value
   })
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    setLoading(true)
    try {
    const response =  await axios.post(`${API_BASE_URL}/api/users/register`,formData)

        alert('Form submitted successfuly')
        if(response.status === 201){
          navigate("/login")
        }
    } catch (error) {
      console.log(error);
      setError(error)
    } finally{
      setLoading(false)
    }
    console.log(formData);
    
  }
  return (
    <div className={styles.mainContainer} >
        <div className={styles.formContainer}>
         <div className={styles.container}>
          <h1>Create your account</h1>
            <p>Your personal job finder is here</p>
            {error && <p className={styles.errorMessage}>{error.message}</p>}
            <form action="" onSubmit={handleSubmit}>
              <input 
                type="text"
                name='name'
                placeholder='Name'
                value={formData.name} 
                onChange={handleChange}    
              />
              <input 
                type="text"
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange} 
              />
              <input 
                type="text"
                name='mobile'
                placeholder='Mobile' 
                value={formData.mobile}
                onChange={handleChange}
              />
              <input 
                type="text"
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange} 
              />
              <label htmlFor="terms">
                <input 
                  type="checkbox"
                  name='terms'
                  onChange={handleChange}
                  checked={formData.terms}
                />
                By creating an account, I agree to our terms of use and privacy policy
              </label>
              <button type='submit'>{loading ?'Creating Account ...':'Create Account'}</button>
            </form>
            <p>Already have an account?<a href="" onClick={()=>navigate('/login')}>Sign In</a></p>
         </div>
        </div>
        <div className={styles.imgContainer}>
         <p>Your Personal Job Finder</p>
        </div>
    </div>
  )
}

export default Signup