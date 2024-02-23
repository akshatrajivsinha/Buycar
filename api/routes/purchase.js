const router = require("express").Router();
const Purchase = require("../models/Purchase");
const verify = require("../jwkverify");

router.post("/",async (req, res) => {
  const purchasedetail = Purchase(req.body);

  try {
    const savedetail = await purchasedetail.save();
    res.status(200).json(savedetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/brecord",async (req, res) => {
    const {Buyer_id} = req.query;
    try {
        const buyer = await Purchase.find({Buyer_id});
        console.log(buyer)
      res.status(200).json(buyer);
      
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/drecord",async (req, res) => {
    const {dealer_id} = req.query;
    try {
      const dealer = await Purchase.find({dealer_id});
      console.log(dealer)
      res.status(200).json(dealer);
      
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/", verify,async (req, res) => {

    try {
      const savedetail = await Purchase.find();
      res.status(200).json(savedetail);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
