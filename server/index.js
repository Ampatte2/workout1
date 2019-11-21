require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const apiPort = 3000;
const db = require("./DB");
const workoutRouter = require("./routes/workout-router");

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(bodyParser.json())

db.on("error", console.error.bind(console, "MongoDB connection error:"))


app.get("/", (req,res)=>{
    res.send("Hello World")
});

app.use("/api", workoutRouter);

app.get("/", (req,res)=>{
    

    res.send("Hello World");
})

app.listen(apiPort, ()=> console.log(`Server running on port ${apiPort}`));