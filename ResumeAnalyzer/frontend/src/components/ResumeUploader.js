import { useState } from 'react';
import axios from 'axios';
import ResumeDetails from './ResumeDetails'; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'; 

const ResumeUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState({ loading: false, error: null, success: false })
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // clear previous messages when a new file is selected
    setUploadStatus({ loading: false, error: null, success: false });
    setAnalysisResult(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({ loading: false, error: 'Please select a PDF file first.', success: false })
      return
    }

    if (selectedFile.type !== 'application/pdf') {
        setUploadStatus({ loading: false, error: 'Please select a valid PDF file.', success: false })
        return
    }

    setUploadStatus({ loading: true, error: null, success: false });
    setAnalysisResult(null); 

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      console.log("Uploading file to backend...");
      const response = await axios.post(`${API_BASE_URL}/api/resumes/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Upload successful, received analysis data.")
      setAnalysisResult(response.data)
      setUploadStatus({ loading: false, error: null, success: true })

    } catch (error) {
      console.error("Upload/Analysis failed:", error)
      let errorMessage = 'An error occurred during upload or analysis.'
      if (error.response) {
        console.error("Server responded with error:", error.response.data)
        errorMessage = error.response.data?.error || errorMessage
      } else if (error.request) {
        console.error("No response received:", error.request)
        errorMessage = 'No response from server. Please check if the backend is running.'
      } else {
        console.error("Error setting up request:", error.message)
      }
      setUploadStatus({ loading: false, error: errorMessage, success: false })
    }
  };

  return (
    <div className="resume-uploader">
      <h2>Upload Your Resume</h2>
      <div className="upload-section">
        <input type="file" accept=".pdf" onChange={handleFileChange} id="resume-upload" />
        <label htmlFor="resume-upload" className="file-label">
          {selectedFile ? selectedFile.name : "Choose a PDF file"}
        </label>
        <button onClick={handleUpload} disabled={uploadStatus.loading || !selectedFile}>
          {uploadStatus.loading ? 'Analyzing...' : 'Upload & Analyze'}
        </button>
      </div>

      {uploadStatus.loading && <div className="loading">Processing your resume, please wait...</div>}
      {uploadStatus.error && <div className="error">Error: {uploadStatus.error}</div>}
      {uploadStatus.success && <div className="success">Resume analyzed successfully!</div>}

      {analysisResult && (
        <div className="analysis-results">
          <h3>Analysis Results</h3>
          <ResumeDetails resumeData={analysisResult} />
        </div>
      )}
    </div>
  );
};

export default ResumeUploader