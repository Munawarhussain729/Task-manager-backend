const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express()
app.use(express.static("public"));
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));


app.listen(8080, ()=>{
    console.log("Server is listening to the port: 8080");
})

