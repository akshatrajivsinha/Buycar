const router = require("express").Router();
const Buyer = require("../models/Buyer");
const verify = require("../jwkverify");

router.post("/:username", async (req, res) => {
  const buyerdetail = Buyer(req.body);

  try {
    const savedetail = await buyerdetail.save();
    res.status(200).json(savedetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:username", async (req, res) => {
  try {
    const buyerdetail = await Buyer.findOne({
        Buyer_name: req.params.username,
    });
    res.status(200).json(buyerdetail);
  } catch (err) {
    console.log("error in getting user");
  }
});

router.put("/:id",async(req,res)=>{
  try{
      const username = req.params.id
      const user = await Buyer.findOneAndUpdate({username:username},req.body,{new:true});
      res.status(200).json(user);

  }catch(err){console.log("error")}
})

module.exports = router;
