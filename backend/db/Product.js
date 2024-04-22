var mongoose=require('mongoose')

var Schemadata=new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    userId:String,
    des:String,
    gender:String,
    course:String,
})

module.exports= mongoose.model('employee',Schemadata)