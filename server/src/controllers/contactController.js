const fs = require('fs');
const path = require('path');

const SUBMISSIONS_FILE = path.join(__dirname, '../../data/submissions.json');

// Ensure data directory and file exist
const ensureFile = () => {
  const dir = path.dirname(SUBMISSIONS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(SUBMISSIONS_FILE)) fs.writeFileSync(SUBMISSIONS_FILE, '[]', 'utf8');
};

// Save a new submission
exports.submitContactForm = async (req, res, next) => {
  try {
    const { name, email, projectType, budget, message } = req.body;

    // Server-side validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: 'Name is required (min 2 characters).' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }
    if (!projectType) {
      return res.status(400).json({ error: 'Please select a project type.' });
    }
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters.' });
    }

    ensureFile();

    // Read existing submissions
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
    const submissions = JSON.parse(raw);

    // Create new entry
    const newEntry = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      projectType,
      budget: budget?.trim() || 'Not specified',
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      read: false,
    };

    submissions.push(newEntry);

    // Save back
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf8');

    console.log(`\n📩 NEW INQUIRY from ${name} (${email})`);
    console.log(`   Type: ${projectType} | Budget: ${budget || 'N/A'}`);
    console.log(`   Message: ${message.substring(0, 80)}...`);
    console.log(`   Saved to: data/submissions.json\n`);

    res.status(200).json({
      success: true,
      message: 'Your message has been received! I will get back to you soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'Something went wrong. Please try again or reach out via WhatsApp.',
    });
  }
};

// Get all submissions (for you to view)
exports.getSubmissions = async (req, res) => {
  try {
    ensureFile();
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
    const submissions = JSON.parse(raw);
    res.status(200).json({ total: submissions.length, submissions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read submissions.' });
  }
};
