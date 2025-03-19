import mongoose from 'mongoose';

const Jobs = new mongoose.Schema({
    company: {
        type: String,
        require: true
    },
    logo: {
        type: String
    },
    position: {
        type: String
    },
    salary: {
        type: Number,
        require: true
    },
    jobType: {
        type: String,
        enum: ['Full Time', 'Part Time', 'Contract', 'Internship']
    },
    remote: {
        type: Boolean,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    about: {
        type: String
    },
    skills: {
        type: [String],
        require: true
    },
    information: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.model('Jobs', Jobs);
