const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const TaskRoutes = require('./routes/tasks')

require('dotenv').config();

const app = express()
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.listen(8080, () => {
    console.log("Server is listening to the port: 8080");
})

mongoose.connect(process.env.MONGO_URL).then((result) => {
    console.log("Mongo DB Connected ");
}).catch((error) => { console.log(error); })

app.use('/task', TaskRoutes)