import React from 'react'
import style from '../../styles/Heading.module.css'

const HeadingComponent = ({job}) => {
  return (
    <div className={style.mainContainer}>
        <p>{job.position} {job.remmote?'Work from home':''} {job.jobType} at {job.company}</p>
    </div>
  )
}

export default HeadingComponent