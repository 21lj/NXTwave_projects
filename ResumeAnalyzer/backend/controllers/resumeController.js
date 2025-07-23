const pool = require('../db')
const { extractTextFromPDF, analyzeResumeWithLLM } = require('../services/analysisService')

/**
 * Controller function to handle resume upload, analysis, storage, and response.
 * @param {Object} req - Express request object. Contains file (via multer) and potentially body data.
 * @param {Object} res - Express response object. Used to send back data or errors.
 */
const uploadResume = async (req, res) => {
    console.log("Received request to upload resume...")
    if (!req.file) {
        console.error("No file uploaded in the request.")
        return res.status(400).json({ error: 'No file uploaded. Please select a PDF file.' })
    }

    if (req.file.mimetype !== 'application/pdf') {
        console.error("Uploaded file is not a PDF.");
        return res.status(400).json({ error: 'Invalid file type. Please upload a PDF file.' })
    }

    const fileName = req.file.originalname

    try {
        console.log("Calling service to extract text from PDF...")
        const resumeText = await extractTextFromPDF(req.file.buffer)
        console.log("Text extraction successful.")

        console.log("Calling service to analyze text with LLM...")
        const analysisResult = await analyzeResumeWithLLM(resumeText)
        console.log("LLM analysis successful.")

        console.log("\n--- DEBUG: Raw LLM Analysis Result ---")
        console.log(JSON.stringify(analysisResult, null, 2))
        console.log("--- END DEBUG ---\n")



        const fieldsToCheck = ['work_experience', 'education', 'technical_skills', 'soft_skills', 'projects', 'certifications', 'upskill_suggestions'];
    fieldsToCheck.forEach(field => {
     if (analysisResult[field] !== undefined && analysisResult[field] !== null) {
        try {
            // Attempt to stringify and re-parse. This often catches subtle JSON issues.
            const jsonString = JSON.stringify(analysisResult[field]);
            JSON.parse(jsonString);
            // If successful, log the valid JSON string
            console.log(`Field '${field}' is valid JSON.`);
            // console.log(`Content: ${jsonString}`); // Uncomment to see content
        } catch (jsonError) {
            console.error(`\n!!! INVALID JSON DETECTED in field '${field}' !!!`);
            console.error(`Type: ${typeof analysisResult[field]}`);
            console.error(`Value (as string):`, String(analysisResult[field]));
            console.error(`Error:`, jsonError.message);
            // You might want to sanitize or set to null here if critical
            // analysisResult[field] = null; // Example: Set invalid field to null
        }
    }
});



        console.log("Saving analysis results to database...")
        const {
           name, email, phone, linkedin_url, portfolio_url, summary,
           work_experience, education, technical_skills, soft_skills,
            projects, certifications,
            resume_rating, improvement_areas, upskill_suggestions
        } = analysisResult;

        // --- KEY CHANGE: Explicitly stringify JSONB fields ---
// Convert JSONB fields to JSON strings. pg will correctly pass these as JSON to Postgres.
const work_experience_json = JSON.stringify(work_experience);
const education_json = JSON.stringify(education);
const technical_skills_json = JSON.stringify(technical_skills);
const soft_skills_json = JSON.stringify(soft_skills);
const projects_json = JSON.stringify(projects);
const certifications_json = JSON.stringify(certifications);
const upskill_suggestions_json = JSON.stringify(upskill_suggestions);
// --- END KEY CHANGE ---

        const insertQuery = `
            INSERT INTO resumes (
                file_name, name, email, phone, linkedin_url, portfolio_url, summary,
                work_experience, education, technical_skills, soft_skills,
                projects, certifications, -- Include projects and certifications
                resume_rating, improvement_areas, upskill_suggestions
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING *; -- Return the inserted row (including the generated id)
        `;

        const values = [
    fileName, name, email, phone, linkedin_url, portfolio_url, summary,
    work_experience_json, education_json, technical_skills_json, soft_skills_json, 
    projects_json, certifications_json, 
    resume_rating, improvement_areas, upskill_suggestions_json 
];

        const dbResult = await pool.query(insertQuery, values)
        const insertedResume = dbResult.rows[0]

        console.log(`Resume analysis saved to database with ID: ${insertedResume.id}`)

        // send the full analysis result back to the frontend
        // combine the database ID with the analysis result for a complete response
        const fullResponse = {
            id: insertedResume.id, 
            file_name: fileName,
            uploaded_at: insertedResume.uploaded_at, 
            ...analysisResult 
        }

        console.log("Sending successful response to frontend.")
        return res.status(201).json(fullResponse)

    } catch (error) {
        console.error("Error in uploadResume controller:", error)

        let errorMessage = 'An unexpected error occurred during resume processing.'
        let statusCode = 500

        if (error.message.includes("Failed to extract text from PDF")) {
            errorMessage = error.message
            statusCode = 400
        } else if (error.message.includes("LLM API Error") || error.message.includes("LLM did not return valid JSON")) {
            errorMessage = error.message
            statusCode = 500
        }
        return res.status(statusCode).json({ error: errorMessage });
    }
}


/**
 * Controller function to retrieve all resumes (for the historical viewer).
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getAllResumes = async (req, res) => {
    console.log("Received request to get all resumes...")
    try {
        const selectQuery = 'SELECT * FROM resumes ORDER BY uploaded_at DESC;'
        const dbResult = await pool.query(selectQuery)

        console.log(`Retrieved ${dbResult.rows.length} resumes from database.`)
        return res.status(200).json(dbResult.rows)

    } catch (error) {
         console.error("Error in getAllResumes controller:", error)
         return res.status(500).json({ error: 'Failed to retrieve resumes from the database.' })
    }
};

/**
 * Controller function to retrieve a single resume by its ID (for the details modal).
 * @param {Object} req - Express request object. Contains params (including id).
 * @param {Object} res - Express response object.
 */
const getResumeById = async (req, res) => {
     const resumeId = req.params.id
     console.log(`Received request to get resume with ID: ${resumeId}`)

     if (!resumeId || isNaN(resumeId)) {
          console.error("Invalid resume ID provided:", resumeId)
          return res.status(400).json({ error: 'Invalid resume ID provided.' })
     }

     try {
         const selectQuery = 'SELECT * FROM resumes WHERE id = $1;'
         const dbResult = await pool.query(selectQuery, [resumeId])

         if (dbResult.rows.length === 0) {
              console.log(`Resume with ID ${resumeId} not found.`)
              return res.status(404).json({ error: 'Resume not found.' })
         }

         const resume = dbResult.rows[0]
         console.log(`Retrieved resume with ID: ${resumeId}`)
         return res.status(200).json(resume)

     } catch (error) {
          console.error("Error in getResumeById controller:", error)
          return res.status(500).json({ error: 'Failed to retrieve resume details.' })
     }
};


module.exports = {
    uploadResume,
    getAllResumes,
    getResumeById
}