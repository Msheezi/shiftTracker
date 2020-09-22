const express = require("express");
const router = express.Router();
const Shift = require("../models/shift");

const excluded = { __v: 0 };

const updateObject = (shift, updatedShift) => {
  for (const key in updatedShift) {
    shift[key] = updatedShift[key];
  }

  if (shift.endMiles > 0) {
    totalMiles = parseInt(shift.endMiles) - parseInt(shift.startMiles);
    shift.ttlMiles = totalMiles;
  }

  return shift;
};

router.get("/shifts", async (req, res) => {
  try {
    let shifts = await Shift.find({}, excluded)
    res.json(shifts)
  } catch(err){
    res.json(err)
  }
});

router.get("/search", async (req, res) => {
  const { start, end } = req.query;
  let startDate = new Date(start);

  let endDate =  end ? new Date(end): new Date()

  console.log(startDate, endDate);
  try {
    let docs = 
      await Shift.find(
        {startDateTime: { $gte: startDate, $lte: endDate }}
        ,excluded);

     res.json(docs);
  
    } catch(err) {
      res.json(err)
     }
  // try {

  //   let docs = await Shift.find({shiftStartDate : { $gte: new Date(start), $lte: new Date(end)}})
  //   console.log(docs)
  //   res.json(docs)
  // } catch(err){
  //   res.json(err)
  // }
});

router.get("/:id", async (req, res) => {

  const shiftId = req.params.id;
  try {
    let shift = await Shift.findById(shiftId, excluded)
    res.json(shift)
  } catch(err){
    res.json(err)
  }
  
  
});

router.post("/newShift", async (req, res) => {
  let date = new Date();
  let newShift = new Shift({ startDateTime: date });
  try {
    let shift = await newShift.save();
    res.json(shift)
    } catch(err){
      res.json(err)
    }
  });

router.patch("/:id", async (req, res) => {
  let shiftId = req.params.id;
  const updatedShift = req.body;
  const [shift] = await Shift.find({ _id: shiftId });
  const updates = await updateObject(shift, updatedShift);
  try {
    let doc = await Shift.findOneAndUpdate({ _id: shiftId }, updates, {
      new: true,
      fields: excluded,
    });
    res.json(doc);
  } catch (err) {
    res.json(err);
  }
});

router.patch("/close/:id", async (req, res) => {
  let shiftId = req.params.id;
  const updatedShift = req.body;
  const [retrievedshift] = await Shift.find({ _id: shiftId });
  const shift = await updateObject(retrievedshift, updatedShift);
  shift.endDateTime = new Date();
  let start = new Date(shift.startDateTime);
  let end = new Date(shift.endDateTime);

  // possibly move to a helper function
  shift.shiftDuration = (
    (end.getTime() - start.getTime()) /
    (60 * 60 * 1000)
  ).toFixed(2);
  
  shift.ttlComp = (
    16 * shift.shiftDuration +
    shift.ttlMiles * 0.57 +
    shift.tips
  ).toFixed(2);

  shift.closed = true;
  
    try {
      let doc =  
      await Shift.findOneAndUpdate({ _id: shiftId },shift,{ new: true, fields: excluded })
      res.json(doc)
    }
     catch(err){
       res.json(err)
     }

  
});





module.exports = router;
