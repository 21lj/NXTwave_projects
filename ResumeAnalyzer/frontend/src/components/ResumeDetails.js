import './ResumeDetails.css'; 

const ResumeDetails = ({ resumeData }) => {
  if (!resumeData) {
    return <div className="details-placeholder">No resume data to display.</div>;
  }

  const renderList = (items, label = "") => {
    if (!Array.isArray(items) || items.length === 0) {
        return <p className="empty-field">{label}: Not specified</p>
    }
    return (
      <ul className="details-list">
        {items.map((item, index) => (
          <li key={index}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>
        ))}
      </ul>
    );
  };

   // Helper function to safely render JSONB objects 
   const renderObjectList = (items, itemName) => {
       if (!Array.isArray(items) || items.length === 0) {
           return <p className="empty-field">No {itemName} listed.</p>
       }
       return (
           <div className="object-list">
               {items.map((item, index) => (
                   <div key={index} className="object-item">
                       <h4>{item.role || item.name || item.degree || `Item ${index + 1}`}</h4>
                       <ul>
                           {Object.entries(item).map(([key, value]) => {
                               if ((key === 'role' || key === 'name' || key === 'degree') || !value || (Array.isArray(value) && value.length === 0)) {
                                   return null;
                               }
                               if (Array.isArray(value)) {
                                   return (
                                       <li key={key}>
                                           <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                                           <ul>
                                               {value.map((v, i) => <li key={i}>{v}</li>)}
                                           </ul>
                                       </li>
                                   );
                               }
                               return <li key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}</li>
                           })}
                       </ul>
                   </div>
               ))}
           </div>
       );
   };


  return (
    <div className="resume-details">
      <section className="section">
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> {resumeData.name || 'Not provided'}</p>
        <p><strong>Email:</strong> {resumeData.email || 'Not provided'}</p>
        <p><strong>Phone:</strong> {resumeData.phone || 'Not provided'}</p>
        {resumeData.linkedin_url && <p><strong>LinkedIn:</strong> <a href={resumeData.linkedin_url} target="_blank" rel="noopener noreferrer">{resumeData.linkedin_url}</a></p>}
        {resumeData.portfolio_url && <p><strong>Portfolio:</strong> <a href={resumeData.portfolio_url} target="_blank" rel="noopener noreferrer">{resumeData.portfolio_url}</a></p>}
      </section>

      {resumeData.summary && (
        <section className="section">
          <h3>Summary</h3>
          <p>{resumeData.summary}</p>
        </section>
      )}

      <section className="section">
        <h3>Work Experience</h3>
        {renderObjectList(resumeData.work_experience, "work experiences")}
      </section>

      <section className="section">
        <h3>Education</h3>
        {renderObjectList(resumeData.education, "education entries")}
      </section>

       <section className="section">
        <h3>Projects</h3>
        {renderObjectList(resumeData.projects, "projects")}
      </section>

       <section className="section">
        <h3>Certifications</h3>
        {renderObjectList(resumeData.certifications, "certifications")}
      </section>

      <section className="section">
        <h3>Skills</h3>
        <h4>Technical Skills:</h4>
        {renderList(resumeData.technical_skills)}
        <h4>Soft Skills:</h4>
        {renderList(resumeData.soft_skills)}
      </section>

      <section className="section analysis-section">
        <h3>AI Analysis</h3>
        <div className="rating">
          <strong>Resume Rating:</strong>
          <span className="rating-score">{resumeData.resume_rating}/10</span>
        </div>
        <div className="analysis-item">
          <h4>Improvement Areas:</h4>
          <p>{resumeData.improvement_areas || 'None specified.'}</p>
        </div>
        <div className="analysis-item">
          <h4>Upskill Suggestions:</h4>
          {renderList(resumeData.upskill_suggestions)}
        </div>
      </section>
    </div>
  );
};

export default ResumeDetails