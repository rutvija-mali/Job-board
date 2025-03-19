import React from 'react'
import style from '../../styles/Card.module.css'
import searchSvg from '../../assets/Vector (1).svg'
import Button from '../common/Button'
import { useAuth } from '../../AuthProvider'
import { useNavigate } from 'react-router-dom'

const availableSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "CSS",
  "HTML",
  "Express.js",
  "Python",
  "Java",
  "SQL",
];

const card = ({setSearchQuery,selectedSkills,setSelectedSkills}) => {
  const {user }= useAuth()
  const navigate = useNavigate()
  const handleSkillSelect= (e)=>{
    const skill = e.target.value;
    if(skill && !selectedSkills.includes(skill) ){
      setSelectedSkills([...selectedSkills,skill])
    }
  }

  const handleRemoveSkill=(skillToRemove)=>{
    setSelectedSkills(selectedSkills.filter((skill)=>skill != skillToRemove))
  }

  const handleClear = ()=>{
    setSearchQuery('')
    setSelectedSkills([])
  }

  return (
    <div className={style.mainContainer}>
        <div className={style.containerSecond}>
            <div className={style.search}>
                <div className={style.searchWrapper}>
                    <img src={searchSvg} alt="search icon" />
                    <input type="text" 
                        placeholder="Type any job title" 
                        name="search" 
                        onChange={(e)=>setSearchQuery(e.target.value)} 
                    />
                </div>

            </div>
            <div className={style.filter}>
              <div className={style.filterOption}>
                <select name="" id="" onChange={handleSkillSelect}>
                    <option value="Select" selected>Select</option>
                    {availableSkills.map((skill)=>(
                      <option key={skill} value={skill}>{skill}</option>
                    )
                  )}
                </select>
                <div class={style.chipContainer}>
                {selectedSkills.map((skill)=>(
                  <div class={style.chip} key={skill}>
                    <span className={style.text}>{skill} </span> <span class={style.close} onClick={()=>handleRemoveSkill(skill)}>&times;</span>
                  </div>
                ))} 
                </div>
              </div>
              <div className={style.bottom}>
                 {user?(
                  <>
                    <Button text={'+ Add Job'} onClick={()=>navigate('/new-job')}/>
                    <button className={style.clearBtn} onClick={handleClear}>Clear</button>
                  </>
                 ):(
                  <>
                    <Button text={'Apply Filter'}/>
                    <button className={style.clearBtn} onClick={handleClear}>Clear</button>
                  </>
                 )}
              </div>
            </div>
        </div>
    </div>
  )
}

export default card