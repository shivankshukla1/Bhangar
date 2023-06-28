const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
app.use(cors())
app.use(express.json());
var nodemailer = require('nodemailer');


app.listen(5000 , ()=>{
    console.log("the server is up and running");
});
const mongoUrl = "mongodb+srv://thealgorithm:thealgorithm@cluster0.iye8cid.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoUrl, {
    useNewUrlParser:true
}).then(()=>{console.log("connected to database");})
.catch(console.log("error"));


require("./userDetails");
require("./productDetails");
const User = mongoose.model("UserInfo");
const Product = mongoose.model("productDetails");
const jwt = require("jsonwebtoken");
const jwt_secret = "asdfoij23[dfsfs';sdfs3gsdf";



app.post("/login", async(req, res)=>{
    const {email, password} = req.body;
    // console.log(req.body);

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.send({"status":"UserNotFound"});
        }
        
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign({email:user.email}, jwt_secret, {
                expiresIn:"10m",
            });
            if(res.status(201)){
                return res.json({status:"ok", data:token});
            }   else{
                return res.json({error:"error"});
            } 
        }
        return res.json({status:"InvalidPassword"});
        
    } catch (error) {
        res.send({"status": error})
    }

})

app.post("/register", async(req, res)=>{

    const {name, email, password} = req.body;
    // console.log(name + " " + email + " " + password);
    
    const encrypted_pass = await bcrypt.hash(password, 10);
    // console.log(req.body);
    try {
        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.send({"status":"UserExists"});
        }    
        await User.create({
            uname:name,
            email:email,
            password:encrypted_pass
        });
        res.send({"status":"Ok"});
    } catch (error) {
        res.send({"status": error})
    }
})

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  console.log(token);
  try {
    const user = jwt.verify(token, jwt_secret, (err, res) =>{
        if(err){
            return "token expired";
        }
        return res;
    });
    console.log(user, "this is the user");
    
    if(user == "token expired"){
        return res.send({status:"tokenExpired",});
    }
    
    const email = user.email;

    const pro = await Product.find({email});
    // console.log("this is the email", email);
    // console.log("we are printing");
    // console.log(pro[0]);
    // console.log("we are printing");
      
      res.send(pro); 
  } catch (error) { 
    return res.send({status:"error", data:error});
  }
});

var token_here = "";
var One_Time_Password = 123;

app.post("/forgotpassword", async(req, res) =>{
  const {email} = req.body;
  try {
    
    const oldUser = await User.findOne({email});
    if(!oldUser){
      return res.json({status:"User Not found"});
    }

    const secret = jwt_secret + oldUser.password;
    const token = jwt.sign({email:oldUser.email, uname:oldUser.uname}, secret, {
      expiresIn:"1m",
    })
    token_here = token;
    var code = 100000 + Math.floor(Math.random() * 900000);
    One_Time_Password = code;
    console.log("OTP IS ", One_Time_Password);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shivankshukla2001@gmail.com',
        pass: 'hnfdnqxewvxzvtee'
      }
    });
    
    var mailOptions = {
      from: 'youremail@gmail.com',
      to: email,
      subject: 'Otp for the Bhangar App',
      text: 'The otp to change your password is ' +One_Time_Password 
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });


    return res.json({status:"Otp", email:email, etoken:token});
  } catch (error) { 

  }
});


app.post("/otp_verification", async (req, res) =>{
  const otp = req.body.OTP;
  const email = req.body.email;
  const newpassword = req.body.password;
  const encrypted_new_pass = await bcrypt.hash(newpassword, 10);
  const token = req.body.etoken;
  // console.log(req.body);
  // console.log(token);
  // console.log(token_here);
  // console.log(otp + " and " + One_Time_Password);


  const oldUser = await User.findOne({email});
  if(!oldUser){
    return res.json({status:"User Not found"});
  }

  try {
    const secret = jwt_secret + oldUser.password;
      
    const user = jwt.verify(token, secret, (err, res) =>{
        if(err){
            return res.json({status:"not_verified"});
        }
        return res;
    });

    if(user == "token expired" || otp != One_Time_Password){
        return res.send({status:"not_verified", data:"token expired"});
    }
    await User.updateOne(
      {
        email:email,
      },
      {
        $set: {
          password:encrypted_new_pass,
        },
      } 
    );
    return res.json({status:"verified"});
  } catch (error) {
    return res.json({status:error});
  }
});


app.post("/upload", async(req, res)=>{
  const {title, price, PhoneNo, description, type, email, image} = req.body;  
  var product_id = 100000 + Math.floor(Math.random() * 900000);
  const oldProduct = await User.findOne({product_id});
  while(oldProduct){
    product_id = 100000 + Math.floor(Math.random() * 900000);
    oldProduct = await User.findOne({product_id});
  }  
  console.log('here');
  console.log(product_id);
  console.log(req.body);
  try {
          
      await Product.create({
        title, 
        price, 
        product_id,
        PhoneNo, 
        description, 
        type, 
        email,
        image
      });
      res.send({"status":"Uploaded"});
  } catch (error) {
      console.log(error);
      res.send({"status": error})
  }
})


app.post("/products", async(req, res) =>{
  const pro = await Product.find({});
  res.send(pro); 
});

app.post("/category_products", async(req, res) => {
  const {type }= req.body;
  console.log(type);
  const pro = await Product.find({type});
  res.send(pro);
});

app.post("/delete_product", async(req, res) => {
  const {token, product_id}= req.body;
  console.log("deleting the product");
  try {
    const user = jwt.verify(token, jwt_secret, (err, res) =>{
        if(err){
            return "token expired";
        }
        return res;
    });
    console.log(user, "this is the user");
    
    if(user == "token expired"){
        return res.send({status:"error", data:"token expired"});
    }
    
    try {
      await Product.deleteOne({product_id});

      return res.send({status:"deleted"});
    } catch (error) {
      return res.send({status:"error", data:error});      
    }
    
  } catch (error) { 
    return res.send({status:"error", data:error});
  }
});




app.post("/checkLogged", async(req, res) => {
  const {token}= req.body;
  try {
    const user = jwt.verify(token, jwt_secret, (err, res) =>{
        if(err){
            return "token expired";
        }
        return res;
    });
    console.log(user, "this is the user");
    
    if(user == "token expired"){
        return res.send({status:"token_expired"});
    }
    
    return res.send({status:"loggedIn"});
    
  } catch (error) { 
    return res.send({status:"error", data:error});
  }
});

app.post("/product_details", async(req, res) => {
  const {product_id}= req.body;
  console.log(product_id);
  const pro = await Product.find({product_id});
  res.send(pro);
})