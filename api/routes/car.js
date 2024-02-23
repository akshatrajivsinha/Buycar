const router = require("express").Router();
const Car = require("../models/Car");
const verify = require("../jwkverify");

router.post("/",async (req, res) => {
  const cardetail = Car(req.body);

  try {
    const savedetail = await cardetail.save();
    res.status(200).json(savedetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/filterboth",verify,async (req, res) => {
  const {name,model} = req.query;
  try {
    const savedetail = await Car.find({name,model});
    res.status(200).json(savedetail);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/filtername",verify,async (req, res) => {
  const {name} = req.query;
  try {
    const savedetail = await Car.find({name});
    res.status(200).json(savedetail);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/filtermodel",verify,async (req, res) => {
  const {model} = req.query;
  try {
    const savedetail = await Car.find({model});
    res.status(200).json(savedetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/drecord",verify,async (req, res) => {
  const {dealer_id} = req.query;
  try {
    const savedetail = await Car.find({dealer_id});
    res.status(200).json(savedetail);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id",verify,async (req, res) => {

    try {
      const savedetail = await Car.findOne({car_id:req.params.id});
      console.log(savedetail)
      res.status(200).json(savedetail);
    } catch (err) {
      res.status(500).json(err);
    }
  });



  router.get("/",verify,async (req, res) => {
    try {
      const savedetail = await Car.find();
      res.status(200).json(savedetail);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
