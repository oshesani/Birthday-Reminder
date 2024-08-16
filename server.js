const express = require("express")
require('dotenv').config();
const connectDb = require("./config/dbConnection")
const cronReminder = require("./cron/birthdayReminderJob")


connectDb()
const app = express()

const port = process.env.PORT || 6000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is working!');
  });

 
  app.use("/api/users", require("./routes/userRoutes")); 
  app.use("/api/birthday", require("./routes/birthdayRoute")); 
  

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    cronReminder;
  });
  