const express = require('express');
const morgan = require('morgan');
const { sendOtpEmail } = require('./functions/mailer');
const { generateOTP, isValidEmail } = require('./functions/generate-otp');

const app = express();
const router = express.Router();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
require('dotenv').config(); // Load environment variables

// Define API Route with Validation & Error Handling
router.post('/send-mail', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Generate OTP and send email
        const otp = generateOTP();
        const sendMailResponse = await sendOtpEmail(otp, email);

        res.status(200).json({ message: sendMailResponse, otp }); // Optional: Include OTP for testing
    } catch (error) {
        console.error("Error sending OTP email:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Attach Router to App with Prefix `/api`
app.use('/api', router);

const PORT = process.env.PORT || 3020;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
