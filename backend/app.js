const express = require("express");
const mongoose = require("mongoose");
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
require("./unverifiedUser");
require("./otp");

const User = mongoose.model("UserInfo");
const Product = mongoose.model("productDetails");
const unverifiedUser = mongoose.model("unverifiedUser");
const otp1 = mongoose.model("otp");
const jwt = require("jsonwebtoken");
const jwt_secret = "asdfoij23[dfsfs';sdfs3gsdf";


app.post("/login", async(req, res)=>{
    const {email, password} = req.body;

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

app.post("/EmailVerification", async(req, res) => {
  const {verificationToken} = req.body;
  console.log(verificationToken);
  try{
    const unverifiedOldUser = await unverifiedUser.findOne({verificationToken});
    if(!unverifiedOldUser){
      return res.send({ "status": "link invalid" });
    }
    email = unverifiedOldUser.email;
    name = unverifiedOldUser.uname;
    encrypted_pass = unverifiedOldUser.password;
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
              unverifiedOldUser.deleteOne({email});
              res.send({"status":"Ok"});
          } catch (error) {
              res.send({"status": error})
          }
    }catch (error) {
        res.send({"status": error})
    }
})

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send({ "status": "UserExists" });
        }
        const unverifiedOldUser = await unverifiedUser.findOne({email});
        if(unverifiedOldUser){
          return res.send({ "status": "not verified" });
        }

        const emailVerificationToken = Math.random().toString(36).substring(2, 15);
        // console.log(emailVerificationToken);
        const encrypted_pass = await bcrypt.hash(password, 10);
        
        await unverifiedUser.create({
            uname: name,
            email: email,
            password: encrypted_pass,
            verificationToken: emailVerificationToken // Add this field
        });
      
      const verificationLink = `https://resold.netlify.app/EmailVerification/${emailVerificationToken}`;
      const mailOptions = {
          from: 'youremail@gmail.com',
          to: email,
          subject: 'Email Verification for Your App',
          html: `Click <a href="${verificationLink}">here</a> to verify your email.`
      };

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'shivankshukla2001@gmail.com',
          pass: 'hnfdnqxewvxzvtee'
        }
      });

      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
              return res.send({ "status": "Error sending verification email" });
          } else {
              console.log('Email sent: ' + info.response);
              return res.send({ "status": "Ok" });
          }
      });
  } catch (error) {
      res.send({ "status": error });
  }
});




app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, jwt_secret, (err, res) =>{
        if(err){
            return "token expired";
        }
        return res;
    });
    
    if(user == "token expired"){
        return res.send({status:"tokenExpired",});
    }
    
    const email = user.email;
    const pro = await Product.find({email});
    res.send(pro); 
  } catch (error) { 
    return res.send({status:"error", data:error});
  }
});


app.post("/forgotpassword", async(req, res) =>{
  const {email} = req.body;
  try {
    const oldUser = await User.findOne({email});
    if(!oldUser){
      return res.json({status:"User Not found"});
    }

    const secret = jwt_secret + oldUser.password;
    const token = jwt.sign({email:oldUser.email, uname:oldUser.uname}, secret, {
      expiresIn:"20m",
    })

    const One_Time_Password = 100000 + Math.floor(Math.random() * 900000);
    await otp1.create({
      otp: One_Time_Password,
      email: email,
      token: token,
    });

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
      subject: 'Otp for the ReSold App',
      text: 'The otp to change your password is ' + One_Time_Password + '. This will be valid for 2 minutes'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        // console.log(error);
      } else {
        // console.log('Email sent: ' + info.response);
      }
    });

    return res.json({status:"Otp", email:email});
  } catch (error) { 

    return res.json({status:error});
  
  }
});


app.post("/otp_verification", async (req, res) =>{
  const otp = req.body.OTP;
  const email = req.body.email;
  const newpassword = req.body.password;
  encryp_newpassword = await bcrypt.hash(newpassword, 10)
  // console.log(otp, " and ", email, " and ", newpassword);
 
  const oldUser = await User.findOne({email});
  if(!oldUser){
    return res.json({status:"User Not found"});
  }

  const otpDetail = await otp1.findOne({email, otp});
  if(!otpDetail){
    return res.json({status:"Wrong OTP"}) 
  }

  token = otpDetail.token;
  try {
    const secret = jwt_secret + oldUser.password;      
    const user = jwt.verify(token, secret, (err, res) =>{
        if(err){
            return res.json({status:"not_verified"});
        }
        return res;
    });
    if(user == "token expired"){
        return res.send({status:"not_verified", data:"token expired"});
    }
    await User.updateOne(
      {
        email:email,
      },
      {
        $set: {
          password:encryp_newpassword,
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


app.post("/edit", async(req, res)=>{
  const {title, price, PhoneNo, description, type, email, image, product_id} = req.body;  
  try {
      await Product.updateOne(
        {
          product_id:product_id,
        },
        {
          $set: {
            title, 
            price, 
            PhoneNo, 
            description, 
            type, 
            email,
            image
          },
        } 
      );
      res.send({"status":"Uploaded"});
  } catch (error) {
      res.send({"status": error})
  }
})

app.post("/products", async(req, res) =>{
  const pro = await Product.find({});
  res.send(pro); 
});

app.post("/category_products", async(req, res) => {
  const {type }= req.body;
  const pro = await Product.find({type});
  res.send(pro);
});

app.post("/delete_product", async(req, res) => {
  const {token, product_id}= req.body;
  try {
    const user = jwt.verify(token, jwt_secret, (err, res) =>{
        if(err){
            return "token expired";
        }
        return res;
    });
    
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
  const pro = await Product.find({product_id});
  res.send(pro);
})