const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authrouter = require("./routes/auth")
const buyerrouter = require("./routes/buyer")
const dealerrouter = require("./routes/dealer")
const carrouter = require("./routes/car")
const purchaserouter = require("./routes/purchase")

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to mongodb"))
.catch((err)=> console.timeLog(err));

app.use("/api/auth/",authrouter);
app.use("/api/buyer/",buyerrouter);
app.use("/api/dealer/",dealerrouter);
app.use("/api/car/",carrouter);
app.use("/api/purchase/",purchaserouter);




app.listen(5000,()=>{
    console.log("connected to 5000")
})