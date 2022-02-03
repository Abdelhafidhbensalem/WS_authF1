const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    fullName:{type:String},//required==>express Validator
    email:{type:String,lowercase:true,trim:true},
    password:{type:String},
    createdOn:{type:Date,default:Date.now()},
    role:{type:String,enum:["client","admin","superAdmin"],default:"client"}
})

module.exports=User=mongoose.model("user",userSchema)