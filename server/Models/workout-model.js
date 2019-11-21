const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema({
    username : {type: String, unique: true, required: true},
    hash: {type:String, required: true},
    sampleWorkout:{type: Array},
    monthlyWorkout:{type: Array},
    defaultWorkout: {type: Boolean},
})


module.exports = mongoose.model("user", User);
