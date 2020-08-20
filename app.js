const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const db = require("./config/keys").mongoURI
const shifts = require("./routes/shifts")

const port = process.env.PORT || 5000

const app = express()

mongoose.connect(db,  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(()=> console.log("Connected to Mongo"))
.catch((err)=> console.log(err))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.get("/", (req, res)=>{
    res.send("Shirt works B")
})

app.use("/shifts", shifts)

app.listen(port, () => console.log(`Servers Running B, port: ${port}`))

