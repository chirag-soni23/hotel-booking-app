require('dotenv').config()
const mongoose = require('mongoose')
let mongoURL = process.env.MONGO_URL
mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})
let connection = mongoose.connection
connection.on('error',()=>{
    console.log("Mongodb connection failed");
})
connection.on('connected',()=>{
    console.log("Mongodb connection succesfull");
})

module.exports = mongoose;

