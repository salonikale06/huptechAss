import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const generatePDF = (userData) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();

        // Get the directory name of the current module
        const currentDir = process.cwd(); // Get the current working directory

        // Define the file path where the PDF will be saved
        let filePath = path.resolve(currentDir, '..', 'server', 'PdfSave', 'resume.pdf');

        // Remove extra 'C:\' from the file path
        filePath = filePath.replace(/^([a-zA-Z]:\\)(\1+)/, '$1');

        // Pipe the PDF document to a writable stream and save it to the file
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Add content to the PDF document based on the submitted user data
        doc.font('Helvetica-Bold').fontSize(24).text('Resume', { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(18).fillColor('blue').text(`Name: ${userData.name}`);
        doc.fontSize(16).fillColor('green').text(`Experience: ${userData.experience}`);
        doc.fontSize(16).fillColor('purple').text(`Skills: ${userData.skills}`);
        doc.fontSize(16).fillColor('red').text(`Higher Degree: ${userData.higherDegree}`);
        doc.fontSize(16).fillColor('orange').text(`Project: ${userData.project}`);

        // Finalize the PDF document
        doc.end();

        stream.on('finish', () => {
            // PDF generation is complete, resolve with the file path
            resolve(filePath);
        });

        stream.on('error', (error) => {
            // Error occurred during PDF generation, reject with the error
            reject(error);
        });
    });
};

export default generatePDF;
