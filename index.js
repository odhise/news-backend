const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express=require("express");
const postRoutes=require("./routes/posts");
const userRoutes=require("./routes/user");
const userAuth=require("./routes/auth");

dotenv.config();
const app=express()
const PORT=process.env.PORT || 6000;



mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("DB connected")})
.catch((err)=>{
    console.log(err)
})

app.use(express.json())


app.use("/api/posts",postRoutes);
app.use("/api/user",userRoutes);
app.use("/api/auth",userAuth)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})




