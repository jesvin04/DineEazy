const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    phone_number:String
});

module.exports=mongoose.model('User',userSchema);