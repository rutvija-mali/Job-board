import React, { useEffect, useState } from 'react'
import style from '../styles/Job.module.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import log from '../../../server/middlewares/log';

const JobForm = () => {
    const [formData, setFormdata] = useState({
        company:'',
        logo:'',
        position:'',
        salary:'',
        jobType:'Full Time',
        remote:false,
        location:'',
        description:'',
        about:'',
        skills:'',
        information:''
    })
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    const {jobId:jobId} = useParams() // use same param name as describe in rounting
    const navigate = useNavigate()

useEffect(()=>{
    if(jobId){
        axios.get(`http://localhost:5000/api/jobs/${jobId}`)

        .then((response)=>{
            console.log(response.data);
            
            setFormdata(prevState => ({
                ...prevState,
                ...response.data // Merge with existing state
            }));
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
    }
},[jobId])
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        let response;
        
        if (jobId) {
            response = await axios.put(`http://localhost:5000/api/jobs/${jobId}`, formData);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Job Edited successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setFormdata((prevState)=>({
                    ...prevState,
                    ...response.data
                }))
               
            }
        } else {
            response = await axios.post("http://localhost:5000/api/jobs/", formData);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Job added successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setFormdata({
                    company: '',
                    logo: '',
                    position: '',
                    salary: '',
                    jobType: 'Full Time',
                    remote: false,
                    location: '',
                    description: '',
                    about: '',
                    skills: '',
                    information: ''
                });
                
            }
        }


    } catch (error) {
        setError(error.response?.data?.message || 'Something went wrong');
    } finally {
        setLoading(false);
    }
};

    const handleChange =(e)=>{
        const {name,value} = e.target;
        setFormdata({
            ...formData,
            [name]:name === 'remote'? value === 'true':value
        })
    }
    const handleCancel = ()=>{
        setFormdata({ // Reset form after submission
            company: '',
            logo: '',
            position: '',
            salary: '',
            jobType: 'Full Time',
            remote: false,
            location: '',
            description: '',
            about: '',
            skills: '',
            information: ''
        });
        navigate(-1)
    }

  
    
  return (
    <div className={style.mainContainer}>
        <div className={style.formContainer}>
            <div className={style.container}>
                <h1>Add job description</h1>
                 {error && <p className={style.errorMessage}>{error}</p>}
                <form onSubmit={handleSubmit} className="formContainer">
                    <div className={style.formGroup}>
                        <label htmlFor="company">Company Name</label>
                        <input 
                            type="text" 
                            name="company" 
                            placeholder="Enter your company name here" 
                            value={formData.company||''} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="logo">Add logo URL</label>
                        <input 
                            type="text" 
                            name="logo" 
                            placeholder="Enter the link" 
                            value={formData.logo} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="position">Job Position</label>
                        <input 
                            type="text" 
                            name="position" 
                            placeholder="Enter job position" 
                            value={formData.position} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="salary">Monthly Salary</label>
                        <input 
                            type="number" 
                            name="salary" 
                            placeholder="Enter amount in rupees" 
                            value={formData.salary} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="jobType">Job Type</label>
                        <select name="jobType" value={formData.jobType} onChange={handleChange}>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Internship">Internship</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="remote">Remote/Office</label>
                        <select name="remote" value={formData.remote.toString()} onChange={handleChange}>
                            <option value="true">Remote</option>
                            <option value="false">Office</option>
                        </select>
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="location">Location</label>
                        <input 
                            type="text" 
                            name="location" 
                            placeholder="Enter Location" 
                            value={formData.location} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="description">Job Description</label>
                        <textarea 
                            name="description" 
                            placeholder="Type the job description" 
                            value={formData.description} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="about">About Company</label>
                        <textarea 
                            name="about" 
                            placeholder="Type about your company" 
                            value={formData.about} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="skills">Skills Required</label>
                        <input 
                            type="text" 
                            name="skills" 
                            placeholder="Enter the must-have skills" 
                            value={formData.skills} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="information">Information</label>
                        <input 
                            type="text" 
                            name="information" 
                            placeholder="Enter additional information" 
                            value={formData.information} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className={style.formActions}>
                        <button type="button" onClick={handleCancel} className={style.cancelBtn}>Cancel</button>
                        <button type="submit" className="submitBtn">{!jobId?(loading ? 'Adding...':"+ Add"):(loading?'Editing...':'Edit')}</button>
                    </div>
                </form>

            </div>
        </div>
        <div className={style.imgContainer}>
          <p>Recruiter add job details here</p>
        </div>
    </div>
  )
}

export default JobForm