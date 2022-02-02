const mongoose=require("mongoose");


const postsSchema=mongoose.Schema({
    description:{type:String,required:false},
    image:{type:String,required:true},
    title:{type:String,required:false},
    article:{type:String,required:true},
    category:{type:String,required:true}

},
{
    timestamps:true
}
)
module.exports=mongoose.model("Posts",postsSchema);