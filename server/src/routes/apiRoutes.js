const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST /api/contact - handles portfolio form submissions
router.post('/contact', contactController.submitContactForm);

// GET /api/contact - view all submissions (for admin use)
router.get('/contact', contactController.getSubmissions);

module.exports = router;
