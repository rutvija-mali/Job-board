import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import {errorLogger} from '../middlewares/log.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { authMiddleware } from '../middlewares/auth.js'

dotenv.config()
const UserRouter = express.Router()

UserRouter.post('/register',async(req,res)=>{
   try {
    const {name,email,mobile,password} = req.body;


    const existingUser = await User.findOne({email:email})

    if(existingUser){
       return res.status(400).json({message:'Email already exist'})
    }else{
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            name,
            email,
            mobile,
            password:hashedPassword
        })
        await newUser.save()
       return res.status(201).json({message:'User created succeesfuly'})
    }
   } catch (error) {
     errorLogger(error,req,res);
   }
   
})


UserRouter.post('/login',errorLogger,async(req,res)=>{
    try {
        const {email,password}= req.body;
        const existingUser = await User.findOne({email:email});
    
        if(!existingUser){
          return  res.status(400).json({message:'Invalid credentials'})
        }else{
            const isPasswordCorrect = await bcrypt.compare(password,existingUser.password) // return either true or false
            if(!isPasswordCorrect){
              return res.status(400).json({message:'Invalid credentials'})
            }
            const token = jwt.sign({
                id:existingUser._id,
                email : existingUser.email
            },process.env.JWT_SECRET,{expiresIn:'3hr'})
            res.cookie('token',token, {
              httpOnly: true,
              secure: true,     // Ensures cookie is only sent over HTTPS
              sameSite: 'none', // Allows cross-origin cookies     
              maxAge: 3 * 60 * 60 * 1000  
          })
          return  res.status(200).json({message:'User logged in successfully',token:token})
        } 
    } catch (error) {
        errorLogger(error,req,res)
    }
})

UserRouter.get('/me',authMiddleware,async(req,res)=>{
   try {
    res.status(200).json(req.user)
   } catch (error) {
    errorLogger(error,req,res)
   }
})

UserRouter.post('/logout', async(req,res)=>{
  res.clearCookie('token',{
   httpOnly:true,
   sameSite:'strict'
  })
  res.status(200).json({ message: 'User logged out successfully' });
})
export default UserRouter;
