var express=require('express')
var app=express()
var cors=require('cors')
require('./db/config')
var User=require('./db/User')
const Product = require('./db/Product')

const Jwt=require('jsonwebtoken')
const jwtkey='e-comm'

app.use(express.json())
app.use(cors())

app.post('/register',async (req,resp)=>{
    var data=new User(req.body)
    var result= await data.save()
    result=result.toObject()
    delete result.password
    if(result)
    {
        Jwt.sign({result},jwtkey,{expiresIn:'2h'},(err,token)=>{
            if(err)
            {
                resp.send({result : "Data Not Found"})
            }else{
                resp.send({result,Sakib:token})
            }
        })
    }
})

app.post('/login',async(req,resp)=>{
    if(req.body.email&&req.body.password)
    {
    var data= await User.findOne(req.body).select('-password')
    if(data)
    {
        Jwt.sign({data},jwtkey,{expiresIn:'2h'},(err,token)=>{
            if(err)
            {
                resp.send({result:'Data Not fount'})
            }else{
                resp.send({data,Sakib:token})
            }
        })
    }
    console.log(data)

    }else{
        resp.send("Invalid Username And Password")
    }

})

app.post('/addproduct',async (req,resp)=>{
    var data=new Product(req.body)
    var result= await data.save()
    resp.send(result)
})

app.get('/product',async(req,resp)=>{
    var data= await Product.find()
    if(data.length>0)
    {
        resp.send(data)
    }else{
        resp.send({result:"No Data Found"})
    }
    
})

app.delete('/delete/:id',async (req,resp)=>{
    var data= await Product.deleteOne({_id:req.params.id})
    resp.send(data)
})

app.get('/get/:id',async (req,resp)=>{
    var data=await Product.findOne({_id:req.params.id})
      if(data)
      {
         resp.send(data)
      }else{
        resp.send({result:"data is not getting"})
      }
})

app.put("/update/:id",async(req,resp)=>{
    var result= await Product.updateOne({_id:req.params.id},{$set:req.body})
    resp.send(result)
})

app.get('/search/:key',async(req,resp)=>{
    var result= await Product.find({
        "$or":[
            {name:{$regex : req.params.key}},
            {email:{$regex : req.params.key}},
            {phone:{$regex : req.params.key}},
            {des:{$regex : req.params.key}},
            {gender:{$regex : req.params.key}},
            {course:{$regex : req.params.key}}
        ]
    })
    resp.send(result)
})

// function verifytoken (req,resp,next){
//     var token=req.headers['authorization']
//      if(token){
//         token=token.split(' ')[1];
//     Jwt.verify(token,jwtkey,(err,valid)=>{
//         if(err){
//             resp.status(401).send({result:"Please provide valid token"})
//         }else{
//             next()
//         }
//     })
//  }else{
//      resp.status(401).send({result:"Please add token with header"})
//  }
// }
app.listen(5000)

console.log("hello");

