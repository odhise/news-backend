const { verifyTokenAndAdmin,verifyTokenAndAuthorization } = require("./verifyToken");

const router=require("express").Router();
const User=require("../models/user");
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
try{
const id = req.params.id
const updates=req.body
const options={new:true}
const updatedUser=await User.findByIdAndUpdate(id,updates,options)
res.status(200).json(updatedUser)
}
catch(err){
res.status(500).json("error")
}
})
// delete user

router.delete("/:id",verifyTokenAndAdmin, async(req,res)=>{
    try{
return await User.findByIdAndDelete(req.params.id)
res.status(200).json("user successfully deleted")
    }
    catch(err){
res.status(404).json("record not found")
    }
})


// find by id


router.get("/find/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
const user=await User.findById(req.params.id)
const {password, ...others}=user._doc
res.status(200).json(others)
    }
    catch(err){
res.json(err)
    }
})


// find all user

router.get("/",verifyTokenAndAuthorization,async(req,res)=>{
    

    try{
        const users=await User.find()
        res.status(200).json(users)
    }
    catch(err){
res.json(err)
    }
})







module.exports=router;