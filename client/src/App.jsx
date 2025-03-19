import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import JobForm from './pages/JobForm'
import Layout from './pages/Layout'
import JobList from './pages/JobListPage'
import JobDetails from './pages/JobDetails'
import axios from 'axios'
import { AuthProvider } from './AuthProvider'



const App = () => {
axios.defaults.withCredentials = true

  return (
    <div>
       <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/signup' element={<Signup/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/' element={<Layout/>}>
                <Route index element={<JobList/>}/> 
                <Route path='details/:jobId'element={<JobDetails/>} />
              </Route>
              <Route path="/new-job" element={<JobForm/>}/>
              <Route path="/edit/:jobId" element={<JobForm/>}/>
              
        
            </Routes>
          </BrowserRouter>
       </AuthProvider>
    </div>
  )
}

export default App
