

const User = require("../Models/workout-model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const workoutShuffler = require("./workout-shuffler")
const bodyParser = require("body-parser");


register = async (req, res) =>{
    
    let password, sampleWorkout, error;
    const body = req.body;

    //find User Promise
    let findUser = User.findOne({defaultWorkout: true}, function(err, docs){
        if(err){
        console.log(err);
        }else{
            sampleWorkout = docs._doc.sampleWorkout;
        }
    })

    //encrypt password Promise
    let encrypt = bcrypt.genSalt(saltRounds, function(err,salt){
        bcrypt.hash(body.password, salt, function(err, hash){
            password = hash;
            
            
        })
    });

    //wait for both encrypt and find user
    await Promise.all([findUser, encrypt])

    //uses sample workout Data, shuffles returns workout for the month in array
    let thisMonthWorkout = workoutShuffler.workoutShuffler(sampleWorkout[0]);
    

    //creates new user from workout-model
    const user = new User({
                    username : body.username,
                    hash : password,
                    sampleWorkout: sampleWorkout,
                    monthlyWorkout: thisMonthWorkout,
                })
    //saves new user to database
    
    // ********Need to make async function to confirm no duplicate users ****** //
    await user.save(function(err){
        if(err){
            console.log(error.driver)
        };
    })
    
    if(error){
        return res.status(400).json({error: "Username Has Been Taken"})
    }else{
    return res.status(201).json("User Creation Successful")
    }
}

login = async (req, res) =>{
    let body = req.body;
    let user = body.username;
    let password = body.password;
    let dataBaseUser;
    


    //finds the user in the database and sets user to databaseUser variable
    let findUser = User.findOne({username: user}, function(err, docs){
        if(err){
            console.log(err)
        }else{
            dataBaseUser = docs._doc;
        }
    })

    //comparse the request password with the databaseUser stored hash with bcrypt
    await findUser.then((user)=>{
               
        bcrypt.compare(password, user.hash).then(function(response){
            if(response ==true){
                return res.status(201).send(dataBaseUser)
            }else{
                return res.status(400).send({failure:true})
            }
        })
        
    })
    

    

}

getDayWorkout = async(req, res) =>{

}

getNewWorkout = async(req,res)=>{

}

getMonthWorkout = async(req,res)=>{

}

module.exports = {
    register,
    login
}