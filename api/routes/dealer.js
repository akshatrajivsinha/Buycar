const router = require("express").Router();
const Dealer = require("../models/Dealer");
const verify = require("../jwkverify");

router.post("/:username", async (req, res) => {
  const dealerdetail = Dealer(req.body);

  try {
    const savedetail = await dealerdetail.save();
    res.status(200).json(savedetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:username", verify, async (req, res) => {
  try {
    const dealerdetail = await Dealer.findOne({
      dealer_name: req.params.username,
    });
    res.status(200).json(dealerdetail);
  } catch (err) {
    console.log("error in getting user");
  }
});

router.get("/", verify,async (req, res) => {
    try {
      const dealerdetail = await Dealer.find();
      res.status(200).json(dealerdetail);
    } catch (err) {
      console.log("error in getting user");
    }
  });

  router.put("/:id",async(req,res)=>{
    try{
        const username = req.params.id
        const user = await Dealer.findOneAndUpdate({username:username},req.body,{new:true});
        res.status(200).json(user);

    }catch(err){console.log("error")}
})

module.exports = router;
