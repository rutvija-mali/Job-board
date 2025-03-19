import React from 'react';
import styles from "../../styles/JobCard.module.css";
import indiaFlag from "../../assets/emojione-v1_flag-for-india.png"; 
import companyLogo from "../../assets/image 461 (1).png"; // Update with the correct path
import peopleSvg from "../../assets/peopleSvg.svg"
import rupeeSvg from "../../assets/rupeeSvg.svg"
import Button from './Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';

const JobCard = ({ job }) => {
  const {
    _id,
    logo,
    position,
    salary,
    jobType,
    remote,
    location,
    skills = [], 
  } = job;

  const navigate = useNavigate();
  const {user }= useAuth()
  
  return (
    <div className={styles.jobCard}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <img src={logo} alt="Company Logo" onError={(e) => e.target.src = companyLogo} style={{width:'5rem'}}/>
          </div>
          <div className={styles.info}>
            <h3>{position}</h3>
            <div className={styles.middleSection}>
              <p>
                <span><img src={peopleSvg} alt="" /> 11-50</span>
                <span><img src={rupeeSvg} alt="" /> {salary}</span>
                <span className={styles.location}>
                  <img src={indiaFlag} alt="" /> {location}
                </span>
              </p>
            </div>
            <div className={styles.bottom}>
              <p>
                <span>{remote ? "Remote" : "Office"}</span>
                <span>{jobType}</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.tags}>
            <p>
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span key={index} className={styles.skill}>{skill}</span>
                ))
              ) : (
                <span className={styles.skill}>No skills listed</span>
              )}
            </p>
          </div>
          <div className={styles.buttonSection}>
            {user && <Button text={'Edit details'} varient={'contained'} onClick={()=>navigate(`/edit/${_id}`)} />}
            <Button text={'View details'} onClick={() => navigate(`/details/${_id}`)} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default JobCard;