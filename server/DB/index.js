const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_CLIENT, {useUnifiedTopology:true}, function(error){
    if(error){
        console.log(error)
    }else{
        console.log("Database Connection")
    }
})


const db = mongoose.connection

db.once("open", function(){
    console.log("we are connected");
})
module.exports = db;