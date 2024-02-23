const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const verify = require("../jwkverify")



router.delete("/delete",verify,async(req,res)=>{
    res.status(200).json("you can delete");
    })

router.post("/register",async(req,res)=>{
    
    try{
        const size = req.body.username.length;
        for( let i=0 ; i<size ; i++){
            if(req.body.username[i] === " ") return(res.status(400).json("No space in Username"));
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        const saveuser = new User(
           { ...req.body,
            password:hashPass,}
        );
        const rest = await saveuser.save();
        res.status(201).json(rest);
    }catch(err){
        res.status(500).json("error");
    }
})


router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user) return(res.status(400).json("user not  found"))
        const isCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isCorrect) return(res.status(400).json("password is wrong"))
        const token = jwt.sign(
            {
                id:user._id,
                isUser:user.isUser,
                isDealer:user.isDealer

            },
            process.env.JWT_KEY
        );
        res.json({
            id:user._id,
            username:user.username,
            isUser:user.isUser,
            isDealer:user.isDealer,
            token,

        })
    }catch(err){
        res.status(500).json("error")
    }
})


router.post("/logout", async (req, res) => {
    res
      .status(200)
      .send("User has been logged out.");
  });

  
module.exports = router 