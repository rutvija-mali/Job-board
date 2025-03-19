import React from 'react'
import style from '../../styles/JobPage.module.css'
import Button from './Button'
import stipendIcon from '../../assets/ph_money-fill.svg'
import durationIcon from '../../assets/uis_calender.svg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthProvider'



const JobPage = ({job}) => {
  const {
    _id,
    company,
    logo,
    position,
    salary,
    jobType,
    remote,
    location,
    skills = [],
    createdAt,
    about,
    information,
    description
  } = job;
  const locationArray =location.split(',').map((item)=>item.trim())
  const navigate = useNavigate()
  const {user }= useAuth()

  return (
    <div className={style.mainContainer}>
      <div className={style.container}>
      <p>
        <span>{createdAt}</span>
        <span> . </span>
        <span>{jobType}</span>
      </p>
      <div className={style.headingContainer}>
          <div className={style.heading}>
            <h1>{position}</h1>
          </div>
          <div>
              {user && <Button text={'Edit job'} onClick={()=>navigate(`/edit/${_id}`)}/>}
          </div>
      </div>
      <p ><span className={style.locationContainer}>{locationArray[0]}| {locationArray[1]}</span></p>
      <div className={style.jobDetails}>
        <div className={style.detail}>   
          <span className={style.label}>
            <img src={stipendIcon} alt="Stipend Icon" className={style.icon} />
            Stipend
          </span>
          <span className={style.value}>Rs {salary}/month</span>
        </div>
        <div className={style.detail}>
          <span className={style.label}>
            <img src={durationIcon} alt="Duration Icon" className={style.icon} />
            Duration
          </span>
          <span className={style.value}>6 Months</span>
        </div>
      </div>
      <div className={style.aboutCompany}>
        <h4>About company</h4>
        <p>{about}</p>
      </div>
      <div className={style.aboutJob}>
        <h4>About the  job/internship</h4>
          <p>{description}</p>
      </div>
      <div className={style.skills}>
        <h4>Skill(s) required</h4>
        <p>
          {skills.map((skill)=><span>{skill}</span>)}
        </p>
      </div>
        <div className={style.additionalInfo}>
          <h4>Additional Information</h4>
            <p>{information}</p>
        </div>
        <div className={style.backButton}>
          <Button text={'Back'} onClick={()=>navigate(-1)}/>
        </div>
      </div>
    </div>
  )
}

export default JobPage