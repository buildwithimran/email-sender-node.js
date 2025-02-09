const nodemailer = require('nodemailer');
require('dotenv').config();


// Send OTP By EMAIL
async function sendOtpEmail(otp, email) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAILER_EMAIL,
            to: email,
            subject: `Verification Code | ${process.env.APP_NAME}`,
            html: prepareEmailTemplate(otp),
        };

        await transporter.sendMail(mailOptions);
        return {
            status: 'success',
            data: otp,
        };
    } catch (error) {
        console.error("Email sending error:", error);
        return {
            status: 'failed',
            data: null,
        };
    }
}

// Prepare Email Template
function prepareEmailTemplate(otp) {
    return `
        <!DOCTYPE html>
        <html>
        
        <head>
            <title>OTP Email</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                }
        
                h1 {
                    color: #333;
                }
        
                p {
                    font-size: 16px;
                    line-height: 1.3;
                    color: #555;
                }
        
                .otp-box {
                    background-color: #3c4041;
                    color: #fff;
                    padding: 10px;
                    font-size: 24px;
                    border-radius: 5px;
                    margin-top: 10px;
                    width: 250px;
                    text-align: center;
                }
            </style>
        </head>
        
        <body>
            <h1>Welcome to ${process.env.APP_NAME}</h1>
            <p>Dear User,</p>
            <p>Your One-Time Password (OTP) for accessing our services is:</p>
            <div class="otp-box">${otp}</div>
            <p>Please use this OTP to complete your login.</p>
            <p>If you did not request this OTP, please disregard this email.</p>
            <p>Thank you for choosing!</p>
            <p>Regards,</p>
            <p>Team ${process.env.APP_NAME}</p>
        </body>
        </html>
    `;
}

module.exports = { sendOtpEmail };