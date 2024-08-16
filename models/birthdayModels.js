const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    reminderDate: { type: Date, required: true }
});

const birthdaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reminders: [{ type: Date }] 
});

const Birthday = mongoose.model('Birthday', birthdaySchema);
module.exports = Birthday;
