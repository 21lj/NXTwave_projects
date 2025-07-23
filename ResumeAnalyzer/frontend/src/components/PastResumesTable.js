import { useState, useEffect } from 'react';
import axios from 'axios'
import ResumeDetails from './ResumeDetails'
import './PastResumeTable.css'

const API_BASE_URL = "https://resume-analyzer-ai-j3tz.onrender.com"

const PastResumesTable = () => {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedResume, setSelectedResume] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        console.log("Fetching past resumes from backend...")
        const response = await axios.get(`${API_BASE_URL}/api/resumes`)
        console.log("Fetched resumes:", response.data)
        setResumes(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching resumes:", err)
        setError('Failed to load resume history. Please try again later.')
        setLoading(false)
      }
    };

    fetchResumes()
  }, [])

  const handleViewDetails = (resume) => {
    console.log("Opening details for resume ID:", resume.id)
    setSelectedResume(resume)
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedResume(null)
  };

  if (loading) {
    return <div className="loading">Loading resume history...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="past-resumes-table">
      <h2>Past Resume Uploads</h2>
      {resumes.length === 0 ? (
        <p className="no-resumes">No resumes have been uploaded yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>File Name</th>
                <th>Uploaded At</th>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume) => (
                <tr key={resume.id}>
                  <td>{resume.id}</td>
                  <td>{resume.file_name}</td>
                  <td>{new Date(resume.uploaded_at).toLocaleString()}</td>
                  <td>{resume.name || 'N/A'}</td>
                  <td>{resume.email || 'N/A'}</td>
                  <td>
                    {resume.resume_rating !== null ? (
                      <span className="rating-badge">{resume.resume_rating}/10</span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleViewDetails(resume)} className="details-button">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && selectedResume && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}> 
            <div className="modal-header">
              <h2>Resume Details - {selectedResume.file_name}</h2>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <ResumeDetails resumeData={selectedResume} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastResumesTable