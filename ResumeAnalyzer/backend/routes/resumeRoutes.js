const express = require('express')
const router = express.Router()
const multer = require('multer')
const resumeController = require('../controllers/resumeController')

// Configure Multer for file upload
// Using memoryStorage stores the file in memory as a Buffer
// This is suitable for small files and allows easy processing before saving (if needed)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB in bytes
    },
    // file filter 
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true)
        } else {
            cb(new Error('Only PDF files are allowed!'), false)
        }
    }
});

/*
 -> uses the 'upload' middleware (configured multer) to handle the single file upload.
 -> expects the file field in the form data to be named 'resume'.
 -> calls the uploadResume controller function.
 */
router.post('/upload', upload.single('resume'), resumeController.uploadResume)

router.get('/', resumeController.getAllResumes)

router.get('/:id', resumeController.getResumeById)

module.exports = router