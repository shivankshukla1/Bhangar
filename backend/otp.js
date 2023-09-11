const mongoose = require("mongoose");

const UserOTP = new mongoose.Schema(
    {
        otp :Number, 
        email : String,
        token:String,
    },
    {
        collection: "otp",
    }
);

mongoose.model("otp", UserOTP)