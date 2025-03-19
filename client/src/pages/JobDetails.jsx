import React, { useEffect, useState } from 'react'
import style from '../styles/JobDetails.module.css'
import HeadingComponent from '../components/common/HeadingComponent'
import JobPage from '../components/common/JobPage'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const JobDetails = () => {
  const {jobId} = useParams()
  
  const[job,setJob] = useState(null)
  useEffect(()=>{
    console.log("job id is "+jobId);
    
    axios.get(`${API_BASE_URL}/api/jobs/${jobId}`)
    .then((response)=>{
         console.log("response data");
         console.log(response.data);
         setJob(response.data);
         console.log(job);
         
    })
    .catch((error)=>{
       const errorMessage =  error.response?.data?.message||'Something went wrong';            
          Swal.fire({
            title: 'Error!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'OK'
          });
    })
  },[jobId])
 
  
  return (
    <div className={style.mainContainer}>
       {job ? (
        <>
          <HeadingComponent job={job}/>

          <div className={style.details}>
            <JobPage job={job}/>
          </div>
        </>
       ):(
        <p>Loading job details...</p>
       )}
    </div>
  )
}

export default JobDetails