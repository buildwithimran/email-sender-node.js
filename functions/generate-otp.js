// Otp generator function
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    return otp.toString();
};


// Email validation function
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


module.exports = { generateOTP, isValidEmail }