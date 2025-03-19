import React, { useEffect, useState } from 'react'
import style from '../styles/JobList.module.css'
import Card from '../components/common/card'
import JobCard from '../components/common/JobCard'
import axios from 'axios'
import Swal from 'sweetalert2'

const JobListPage = () => {
  const [jobs,setJobs]= useState([])
  const [size,setSize] = useState(5)
  const [offset,setOffset] = useState(0)
  const [totalJobs,setTotalJobs] = useState(0)
  const [searchQuery, setSearchQuery] = useState()
  const[selectedSkills, setSelectedSkills] = useState([])

const fetchJobs = async ()=>{
    try {
        const response = await axios.get('http://localhost:5000/api/jobs/',{
          params:{name:searchQuery,skills:selectedSkills.length ? selectedSkills.join(','):undefined,size,offset}
        })
        if(response.status === 200){
          setJobs(response.data.jobs)
          setTotalJobs(response.data.totalJobs)
        }
      }
    catch (error) {
      const errorMessage =  error.response?.data?.message||'Something went wrong';
            
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
    });

  }  
}
  useEffect(()=>{
    fetchJobs();
},[size,offset])

useEffect(()=>{

  const deBounce = setTimeout(()=>{
    fetchJobs();
  },500)
  return ()=>clearTimeout(deBounce)
 
},[searchQuery,selectedSkills])

const handleNext=()=>{
  if(offset+size < totalJobs){
    setOffset(offset+size)
  }
}

const handlePrev =()=>{
  if(offset > 0){
    setOffset(offset-size)
  }
}
  return (
    <div className={style.mainContainer}>
      <div className={style.searchConatainer}>
        <Card setSearchQuery={setSearchQuery} setSelectedSkills={setSelectedSkills} selectedSkills={selectedSkills}/>
      </div>
      <div>
        {jobs && jobs.map((job)=><JobCard job={job} key={job._id}/>)}
      </div>
      <div className={style.paginationContainer}>
        <button onClick={handlePrev} disabled={offset === 0}>Prev</button>
        <span> Page {Math.floor(offset / size) + 1} </span>
        <button onClick={handleNext} disabled={offset + size >= totalJobs}>Next</button>
    </div>
    </div>
  ) 
}

export default JobListPage