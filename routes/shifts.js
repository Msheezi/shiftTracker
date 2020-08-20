const express = require("express")
const router = express.Router()
const Shift = require("../models/shift")


const excluded = {"__v": 0 }

  const updateObject = (shift, updatedShift) =>{

         for (const key in updatedShift){
            shift[key] = updatedShift[key]
            }

            if (shift.endMiles > 0) {
             
            totalMiles = parseInt(shift.endMiles) - parseInt(shift.startMiles);
            shift.ttlMiles = totalMiles;

          }
  
          return shift
        }

router.get("/shifts", (req,res)=>{
    Shift.find({}, excluded)
    .then(shifts => res.json(shifts))
})

router.post("/newShift", (req,res)=> {
    let newShift = new Shift()
    newShift.save()
    .then((shift) => res.json(shift))
 } )

 router.patch("/:id", async (req,res)=> {
     let shiftId = req.params.id 
     const updatedShift = req.body
     const [shift] = await Shift.find({"_id": shiftId})
     const updates = await updateObject(shift, updatedShift)

     Shift.findOneAndUpdate(
       { "_id": shiftId },
        updates,
       { new: true, fields: excluded },

       function (err, doc) {
         if (err) {
           res.json(err);
         }
         res.json(doc);
       }
     );
  
 })

 router.patch("/close/:id", async (req,res)=>{
     let  shiftId = req.params.id 
     const updatedShift = req.body;
     const [retrievedshift] = await Shift.find({"_id": shiftId})
     const shift = await updateObject(retrievedshift, updatedShift);
     shift.endDateTime = Date.now()
     let start = new Date(shift.startDateTime)
     let end = new Date(shift.endDateTime)

     shift.shiftDuration = ((end.getTime() - start.getTime()) / (60*60*1000)).toFixed(2)
     shift.ttlComp = ((16 * shift.shiftDuration) + (shift.ttlMiles * 0.57) + shift.tips).toFixed(2)

     shift.closed = true 

     Shift.findOneAndUpdate(
       { "_id": shiftId },
       shift,
       { new: true, fields: excluded },

       function (err, doc) {
         if (err) {
           res.json(err);
         }
         res.json(doc);
       }
     );
 })

 module.exports = router


  