const cron = require('node-cron');
const Birthday = require("../models/birthdayModels");
const notifyUserOfBirthday = require("../utitlity/notify.utility")


const cronReminder = cron.schedule('0 9 * * *', async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const birthdays = await Birthday.find({
        birthday: { $gte: today, $lt: new Date(today).setDate(today.getDate() + 1) }
    }).populate('userId');

    birthdays.forEach(async (birthday) => {
        const message = `Don't forget ${birthday.name}'s birthday today!`;
        try {
            await notifyUserOfBirthday(birthday.userId.email, {
                name: birthday.name,
                birthday: birthday.birthday
            });
            console.log('Reminder sent:', birthday.userId.email);
        } catch (error) {
            console.log('Error sending email:', error);
        }
    });
});

module.exports = cronReminder