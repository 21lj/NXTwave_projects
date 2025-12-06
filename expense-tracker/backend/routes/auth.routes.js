import express from 'express';
import validate from '../middleware/validate.middleware.js';
import { signupSchema, loginSchema } from '../validators/auth.validator.js';
import { signup, login } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup', validate(signupSchema), signup);

router.post('/login', validate(loginSchema), login);

export default router;
