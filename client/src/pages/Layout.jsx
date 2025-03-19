import React from 'react'
import styles from '../styles/Layout.module.css'
import Topbar from './Topbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className={styles.mainContainer}>
        <div className={styles.topbarContainer}>
         <Topbar/>
        </div>
        <Outlet/>

    </div>
  )
}

export default Layout