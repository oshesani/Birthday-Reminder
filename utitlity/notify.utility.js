const sendEmail = require("../utitlity/sendEmail"); 

const notifyUserOfBirthday = async (userEmail, birthdayDetails) => {
    const subject = `Reminder: ${birthdayDetails.name}'s Birthday`;
    const message = `This is a reminder that ${birthdayDetails.name}'s birthday is on ${birthdayDetails.birthday}.`;
    
    try {
        await sendEmail(userEmail, subject, message);
        console.log('Reminder email sent successfully');
    } catch (error) {
        console.error('Failed to send reminder email:', error);
    }
};

module.exports = notifyUserOfBirthday;
