import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    higherDegree: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    path: {
        type: String,
        // required: true
    },
    downloadContent: {
        type: Number,
        // required: true,
        default: 0
    },  
    experience: {
        type: String,
        required: true // Make sure this is set to true if experience is required
    },
});

const resumeModel = mongoose.model('User_Resume_Data', userSchema);

export default resumeModel;
