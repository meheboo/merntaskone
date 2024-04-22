var mongoose=require('mongoose')

var Schemadata=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

module.exports=mongoose.model('users',Schemadata)