import React from 'react'
import style from '../../styles/Button.module.css'


const Button = ({text,onClick,varient}) => {
  return (
    <button className={varient == 'contained'?style.contained : style.btn} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button