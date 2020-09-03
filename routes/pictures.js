require("dotenv").config();

const express = require('express')
const router = express.Router()
const Picture = require('../models/picture')
const AWS = require('aws-sdk')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const Shift = require('../models/shift')

const excluded = { __v: 0 };
router.delete('/delete/:id', (req,res) => {

    /* for deletes since front end won't have reference for id, 
        send the shiftId and the key down, use a find a delete for picture
        using shiftId, pictureType.  Should have this since you are using
        the key on the front end for startingUrl or endingUrl

        or 
        
    */
    let pictureId = req.params.id 

    Picture.findOneAndDelete({"_id": pictureId})
})

router.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const shiftId = req.body.shiftId;
  const pictureType = req.body.pictureType
  const s3FileURL = process.env.AWS_Uploaded_File_URL_Link;
  const newPictureUrl = s3FileURL + file.originalname;
  
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  s3bucket.upload(params, async (err, data) => {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      const newFileUploaded = {
        shiftId: shiftId,
        pictureUrl: s3FileURL + file.originalname,
        pictureType: pictureType
      };

      const userPicture = new Picture(newFileUploaded);
      let updates = {}
        updates[pictureType] = newPictureUrl
      userPicture.save((error, newFile) => {
        if (error) {
          console.log(error)
        }
        Shift.findOneAndUpdate({ _id: newFile.shiftId }, updates, {
          new: true,
          fields: excluded,
        }).then((shift) => res.json(shift));
            
      })

    }
  })


});


module.exports = router