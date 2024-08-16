const asyncHandler = require("express-async-handler");
const Birthday = require("../models/birthdayModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const notifyUserOfBirthday = require("../utitlity/notify.utility")

//@desc POST  addBirthday
//@route POST /api/birthday/addBirthday
//@access private



const addBirthday = asyncHandler(async (req, res) => {
    const { name, birthday, reminders } = req.body;
    const userId = req.user._id;

    if (!name || !birthday || !reminders) {
        res.status(400);
        throw new Error("All fields are Mandatory");
    }
    const currentDate = new Date();

    
    const eventDate = new Date(birthday);
    if (eventDate >= currentDate) {
        res.status(400);
        throw new Error("Birthday  must be in the past");
    }


    for (let i = 0; i < reminders.length; i++) {
        const reminderDate = new Date(reminders[i]);
        if (reminderDate <= currentDate) {
            res.status(400);
            throw new Error("Reminder dates must be in the future");
        }
    }


    try {
        const newBirthday = new Birthday({ name, birthday, userId, reminders });
        await newBirthday.save();

        //send email notification
        const userEmail = req.user.email; 
        await notifyUserOfBirthday(userEmail, { name, birthday });

        res.status(201).json(newBirthday);
    } catch (error) {
        console.error('Error saving birthday:', error); 
    res.status(500).json({ message: 'Server error' });
    }
});


module.exports = { addBirthday };