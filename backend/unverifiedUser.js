const mongoose = require("mongoose");

const unverifiedUserDetailsSchema = new mongoose.Schema(
    {
        uname: String, 
        email: {type: String, unique:true},
        password: String,
        verificationToken:String,
    },
    {
        collection: "unverifiedUser",
    }
);

mongoose.model("unverifiedUser", unverifiedUserDetailsSchema)