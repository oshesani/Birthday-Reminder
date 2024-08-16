
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema({
   name:{
    type: String,
    required:[true,"Please add name"]
   },

   email: {
    type: String,
    required: [true, "Please add email address"],
    unique: true,
   },

   password: {
    type: String,
    required: [true,"Please Add password"]

   }
},

{
  timestamps: true
}

);

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });



module.exports = mongoose.model("User", userSchema)
