const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (email, subject, message) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent:', email);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
