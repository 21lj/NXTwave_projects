const pdf = require('pdf-parse')
const {GoogleGenerativeAI}= require('@google/generative-ai')
require('dotenv').config()

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
const model=genAI.getGenerativeModel({model: "gemini-2.5-pro"})

/**
 * Extracts text from a PDF buffer.
 * @param {Buffer} pdfBuffer - The buffer containing the PDF data.
 * @returns {Promise<string>} - The extracted text.
 */


async function extractTextFromPDF(pdfBuffer){
    try{
        console.log("Starting PDF extraction")
        const data=await pdf(pdfBuffer)
        console.log("PDF text extraction completed!")
        return data.text
    }catch(error){
        console.error("Error during PDF text extraction:", error);
        throw new Error("Failed to extract text from PDF. The file might be corrupted or password-protected.");
    }
}

/**
 * Generates a prompt for the LLM based on the resume text.
 * @param {string} resumeText - The text extracted from the PDF.
 * @returns {string} - The formatted prompt string.
 */

function createPrompt(resumeText) {
    // Prompt engineering part, based on the example from the assignment document.
   
return `
You are an expert technical recruiter and career coach. Your task is to analyze the resume text provided and output ONLY a valid JSON object. No other text, markdown, or explanation is allowed.

Strictly follow these rules:
1. Escape any special characters (like quotes, backslashes) within JSON string values correctly.
2. Ensure all JSON syntax is correct (e.g., no trailing commas).
3. All fields in the structure below must be present.
4. Array fields should be empty arrays [] if no data is found.
5. String fields should be null if no data is found.
6. Double-check your JSON output for validity before responding.

Resume Text:
"""
${resumeText}
"""

Required JSON Structure:
{
  "name": "string | null",
  "email": "string | null",
  "phone": "string | null",
  "linkedin_url": "string | null",
  "portfolio_url": "string | null",
  "summary": "string | null",
  "work_experience": [{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }],
  "education": [{ "degree": "string", "institution": "string", "graduation_year": "string" }],
  "technical_skills": ["string"],
  "soft_skills": ["string"],
  "projects": [{ "name": "string", "description": "string", "technologies": ["string"] }],
  "certifications": [{ "name": "string", "issuing_organization": "string", "date_obtained": "string" }],
  "resume_rating": "integer (1-10)",
  "improvement_areas": "string",
  "upskill_suggestions": ["string"]
}
`;
}

/**
 * Analyzes the resume text using the Google Gemini LLM.
 * @param {string} resumeText - The text extracted from the PDF.
 * @returns {Promise<Object>} - The parsed JSON object returned by the LLM.
 */

async function analyzeResumeWithLLM(resumeText) {
    try {
        console.log("Generating prompt for LLM...");
        const prompt = createPrompt(resumeText);

        console.log("Sending request to Google Gemini LLM...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Received response from LLM.");

        // Attempt to parse the LLM's response as JSON. Explicitly asks for only JSON
        console.log("Parsing LLM response as JSON...");
        let parsedData;
        try {
            // it handle potential wrapping in code blocks (though prompt asks not to)
            let jsonString = text.trim();
            if (jsonString.startsWith("```json")) {
                jsonString = jsonString.substring(7, jsonString.length - 3).trim();
            } else if (jsonString.startsWith("```")) {
                jsonString = jsonString.substring(3, jsonString.length - 3).trim();
            }
            jsonString = jsonString.replace(/,\s*([}\]])/g, '$1');
            console.log("Attempting to parse cleaned JSON string:");
    console.log(jsonString)


            parsedData = JSON.parse(jsonString);
        } catch (parseError) {
            console.error("Raw LLM Response:", text);
            throw new Error(`LLM did not return valid JSON. Parsing failed: ${parseError.message}`);
        }

        console.log("LLM analysis completed successfully.");
        return parsedData;
    } catch (error) {
        console.error("Error during LLM analysis:", error);
        // Differentiate between LLM API errors and parsing errors if needed
        if (error.message.includes("API_KEY_INVALID") || error.message.includes("FAILED_PRECONDITION")) {
             throw new Error(`LLM API Error: ${error.message}`);
        }
        throw error; // Re-throw other errors (including parsing errors thrown above)
    }
}

module.exports = {
    extractTextFromPDF,
    analyzeResumeWithLLM
}