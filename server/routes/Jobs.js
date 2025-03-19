import express from 'express';
import jwt from 'jsonwebtoken';
import Job from '../models/Jobs.js';
import log, { errorLogger } from '../middlewares/log.js';
import { authMiddleware } from '../middlewares/auth.js';

const JobRouter = express.Router();

JobRouter.get('/', errorLogger, async (req, res) => {
  const name = req.query.name || "";
  const skills = req.query.skills || [];
  const size = parseInt(req.query.size) || 3
  const offset = parseInt(req.query.offset)||0
  const skillArray = Array.isArray(skills) ? skills :(skills ? skills.split(",").map(skill => skill.trim()):[]);
  const regexSkillArray = skillArray.map(skill => new RegExp(`^${skill}$`, "i"));

  let query = {};
  if (name) {
    query.position = { $regex: name, $options: 'i' };
  }
  if (regexSkillArray.length > 0) {
    query.skills = { $in: regexSkillArray };
  }
  const totalJobs = await Job.countDocuments(query)
  const jobs = await Job.find(query)
  .skip(offset)
  .limit(size);
   
  res.status(200).json({jobs,totalJobs});
});

JobRouter.post('/', authMiddleware, async (req, res) => {
  try {
    const { company, logo, position, salary, jobType, remote, location, description, about, skills, information } = req.body;
    const jobSkills = skills.split(',').map((skill) => skill.trim());
    const newJob = new Job({
      company,
      logo,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      about,
      skills: jobSkills,
      information,
      createdBy: req.user.id
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    errorLogger(error, req, res);
  }
});

JobRouter.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        error: {
          message: 'Job not found',
          status: 404
        }
      });
    }
    res.status(200).json(job);
  } catch (error) {
    errorLogger(error, req, res);
  }
});

JobRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const dbJob = await Job.findById(req.params.id);
    if (!dbJob) {
      return res.status(404).json({
        error: {
          message: 'Job not found',
          status: 404
        }
      });
    }

    if (dbJob.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        error: {
          message: 'You are not authorized to delete this job'
        }
      });
    }
    await dbJob.deleteOne();
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    errorLogger(error, req, res);
  }
});

JobRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const dbJob = await Job.findById(req.params.id);
    if (!dbJob) {
      return res.status(404).json({
        error: {
          message: 'Job not found',
          status: 404
        }
      });
    }
    console.log("Job createdBy:", dbJob.createdBy);
    console.log("User ID:", req.user ? req.user.id : "User not found");
    
    if (dbJob.createdBy.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        error: {
          message: 'You are not authorized to update this job',
          status: 401
        }
      });
    }
    
    const { company, logo, position, salary, jobType, remote, location, description, about, skills, information } = req.body;
    
    const jobSkills = skills.split(",").map((skill) => skill.trim());
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        company,
        logo,
        position,
        salary,
        jobType,
        remote,
        location,
        description,
        about,
        skills: jobSkills,
        information,
        updatedAt: Date.now(),
        createdBy: req.user.id
      },
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    errorLogger(error, req, res);
  }
});

export default JobRouter;


