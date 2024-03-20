import resumeModel from '../models/schemaResume.js';
import generatePDF from '../controllers/generatePDF.js'; // Import the generatePDF function
import fs from 'fs';
import path from 'path';

const uploadData = async (req, res) => {
    const { name, experience, skills, higherDegree, project } = req.body;

    const newResume = new resumeModel({
        name,
        experience,
        skills,
        higherDegree,
        project
    });

    try {
        await newResume.save();

        // Generate PDF based on the submitted user data
        const filePath = await generatePDF(req.body);

        // Send success response along with the file path
        res.status(201).json({ msg: "User data uploaded successfully", filePath });
    } catch (error) {
        console.error("Error uploading user data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const downloadPDF = (req, res) => {
    // Get the directory name of the current module
    const currentDir = path.dirname(new URL(import.meta.url).pathname);

    const filePath = path.join(currentDir, '..', 'PdfSave', 'resume.pdf');
    // const filePath = 'C:\huptechAssignment\huptechAss\server\PdfSave\resume.pdf';
    try {
        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Set appropriate headers for the response
            res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
            res.setHeader('Content-Type', 'application/pdf');
            // Send the file as a response
            fs.createReadStream(filePath).pipe(res);
        } else {
            // If file does not exist, send a 404 error response
            res.status(404).json({ error: "File not found" });
        }
    } catch (error) {
        console.error("Error downloading PDF:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default downloadPDF;


export { uploadData, downloadPDF };


