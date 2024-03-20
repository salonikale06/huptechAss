// FormComponent.js

import React, { useState } from 'react';
import axios from 'axios';
import "../components/UserForm.css";


const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    experience: '',
    skills: '',
    higherDegree: '',
    project: ''
  });
  const [pdfFilePath, setPdfFilePath] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/upload', formData);
      if (response.status === 201) {
        setPdfFilePath(response.data.filePath);
      }
    } catch (error) {
      console.error('Error uploading user data:', error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/downloadPDF', {
        responseType: 'blob'
      });
      const blobUrl = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };
  
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Enter Your Information</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="experience" className="form-label">Experience:</label>
              <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleInputChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="skills" className="form-label">Skills:</label>
              <input type="text" id="skills" name="skills" value={formData.skills} onChange={handleInputChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="higherDegree" className="form-label">Higher Degree:</label>
              <input type="text" id="higherDegree" name="higherDegree" value={formData.higherDegree} onChange={handleInputChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="project" className="form-label">Project:</label>
              <textarea id="project" name="project" value={formData.project} onChange={handleInputChange} className="form-input"></textarea>
            </div>
            <button type="submit" className="form-button">Submit</button>
          </form>
          {pdfFilePath && (
            <div className="download-section">
              <h3>Your PDF is ready to download</h3>
              <button onClick={handleDownload} className="download-btn">Download PDF</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
