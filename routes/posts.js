const router=require("express").Router();
const Posts=require("../models/posts")
const { verifyTokenAndAdmin,verifyTokenAndAuthorization } = require("./verifyToken");


router.post("/add", async (req,res)=>{
    const newPosts=new Posts({
        
        description:req.body.description,
        title:req.body.title,
        image:req.body.image,
        article:req.body.article,
        category:req.body.category
        

    })

    try{
        const savedPosts=await newPosts.save()
        res.status(201).json(savedPosts)
    }
    catch(err){
        res.status(404).json(err)
    }

    
})



// update posts

router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
    const id = req.params.id
    const updates=req.body
    const options={new:true}
    const updatedPosts=await Posts.findByIdAndUpdate(id,updates,options)
    console.log(updatedPosts)
    res.status(200).json(updatedPosts)
    }
    catch(err){
        
    res.status(500).json("err")
    }
    })



    //delete posts


    router.delete("/:id",verifyTokenAndAdmin, async(req,res)=>{
        try{
            res.status(200).json("posts successfully deleted")
    return await Posts.findByIdAndDelete(req.params.id)
    
        }
        catch(err){
    res.status(404).json("posts not found")
        }
    })




    // find posts by id


router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
const posts=await Posts.findById(req.params.id)
const {password, ...others}=posts._doc
res.status(200).json(others)
    }
    catch(err){
res.json(err)
    }
})

// find all posts

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    

    try{
        const posts=await Posts.find()
        res.status(200).json(posts)
    }
    catch(err){
res.json(err)
    }
})


module.exports = router;